/*
 * rlcapp - record and organization management software for refugee law clinics
 * Copyright (C) 2018  Dominik Walser
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
    GetDownloadUrl,
    GetUploadUrl,
    UPLOAD_SIGNING_BASE_URL
} from "../../statics/api_urls.statics";
import { SnackbarService } from "./snackbar.service";

@Injectable()
export class StorageService {
    constructor(
        private http: HttpClient,
        private snackbarService: SnackbarService
    ) {}

    uploadFile(file: File, fileDir: string) {
        console.log('file', file);
        this.http
            .get(GetUploadUrl(file, fileDir))
            .subscribe((response: any) => {
                this.uploadFileDirect(file, response.data, response.url);
            });
    }

    uploadFile(file: File, fileDir: string, callbackFn) {
        console.log('file', file);
        this.http
            .get(GetUploadUrl(file, fileDir))
            .subscribe((response: any) => {
                this.uploadFileDirect(file, response.data, response.url);
            });
    }

    uploadFiles(files: File[], file_dir: string) {
        console.log('files', files);
        const file_names = [];
        const file_types = [];
        for (const file of files) {
            file_names.push(file.name);
            file_types.push(file.type);
        }
        console.log('names', file_names);

        this.http
            .post(UPLOAD_SIGNING_BASE_URL, {
                file_names,
                file_types,
                file_dir
            })
            .subscribe((response: any) => {
                const posts = response.presigned_posts;
                console.log(posts);
                for (const post of posts){
                    const file = Array.from(files).filter((filterFile: File) => {
                        return post.data.fields.key === `${file_dir}/${filterFile.name}`
                    })[0];
                    this.uploadFileDirect(file, post.data, post.url);
                }
            });
    }

    private uploadFileDirect(
        file: File,
        s3Data: { url: string; fields: any },
        url: string,
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
                this.snackbarService.showSuccessSnackBar(
                    "file successfully uploaded"
                );
            }
        });
    }

    downloadFile(filekey: string) {
        console.log("trying to download file: ", filekey);
        this.http.get(GetDownloadUrl(filekey)).subscribe((response: any) => {
            if (!response.error) window.location.href = response.data;
            else {
                this.snackbarService.showErrorSnackBar(
                    "file not found, can't download"
                );
            }
        });
    }
}
