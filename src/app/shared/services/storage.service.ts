/*
 * rlcapp - record and organization management software for refugee law clinics
 * Copyright (C) 2019  Dominik Walser
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>
 ******************************************************************************/

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    GetDownloadApiUrl,
    GetUploadApiUrl,
    UPLOAD_SIGNING_BASE_API_URL
} from "../../statics/api_urls.statics";
import { SnackbarService } from "./snackbar.service";

@Injectable()
export class StorageService {
    filesToUpload: number;
    filesUploaded: number;
    filesUploadFinished;

    constructor(
        private http: HttpClient,
        private snackbarService: SnackbarService
    ) {}

    uploadFile(file: File, fileDir: string, finished?) {
        console.log('file', file);
        this.http
            .get(GetUploadApiUrl(file, fileDir))
            .subscribe((response: any) => {
                this.uploadFileDirect(file, response.data, response.url, finished);
            });
    }

    uploadFiles(files: File[], file_dir: string, finished?) {
        // console.log('files', files);
        this.filesToUpload = files.length;
        this.filesUploaded = 0;
        this.filesUploadFinished = finished ? finished : null;

        const file_names = [];
        const file_types = [];
        for (const file of files) {
            file_names.push(file.name);
            file_types.push(file.type);
        }
        console.log('names', file_names);

        this.http
            .post(UPLOAD_SIGNING_BASE_API_URL, {
                file_names,
                file_types,
                file_dir
            })
            .subscribe((response: any) => {
                const presigned_posts = response.presigned_posts;
                for (const post of presigned_posts){
                    const file = Array.from(files).filter((filterFile: File) => {
                        return post.data.fields.key === `${file_dir}/${filterFile.name}`
                    })[0];
                    this.uploadFileDirect(file, post.data, post.url, () => {
                        this.filesUploaded++;
                        if (this.filesUploaded === this.filesToUpload && this.filesUploadFinished)
                            this.filesUploadFinished();
                    });
                }
            });
    }

    private uploadFileDirect(
        file: File,
        s3Data: { url: string; fields: any },
        url: string,
        callbackFn?
    ) {
        const v4form = new FormData();
        v4form.append("x-amz-credential", s3Data.fields["x-amz-credential"]);
        v4form.append("x-amz-algorithm", s3Data.fields["x-amz-algorithm"]);
        v4form.append("key", s3Data.fields["key"]);
        v4form.append("x-amz-signature", s3Data.fields["x-amz-signature"]);
        v4form.append("policy", s3Data.fields["policy"]);
        v4form.append("x-amz-date", s3Data.fields["x-amz-date"]);
        v4form.append("file", file);

        this.http.post(s3Data.url, v4form).subscribe((response: any) => {
            //console.log("posting response:", response);
            if (!response) {
                callbackFn();
            }
        });
    }

    downloadFile(filekey: string) {
        this.http.get(GetDownloadApiUrl(filekey)).subscribe((response: any) => {
            if (!response.error) window.location.href = response.data;
            else {
                this.snackbarService.showErrorSnackBar(
                    "file not found, can't download"
                );
            }
        });
    }
}
