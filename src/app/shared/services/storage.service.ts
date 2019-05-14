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
import * as FileSaver from 'file-saver';


import {
    GetDownloadAllRecordDocumentsApiUrl,
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
        this.http
            .get(GetUploadApiUrl(file, fileDir))
            .subscribe((response: any) => {
                this.uploadFileDirect(
                    file,
                    response.data,
                    response.url,
                    finished
                );
            });
    }

    uploadFiles(files: File[], file_dir: string, finished?) {
        this.filesToUpload = files.length;
        this.filesUploaded = 0;
        this.filesUploadFinished = finished ? finished : null;

        const file_names = [];
        const file_types = [];
        for (const file of files) {
            file_names.push(file.name);
            file_types.push(file.type);
        }

        this.http
            .post(UPLOAD_SIGNING_BASE_API_URL, {
                file_names,
                file_types,
                file_dir
            })
            .subscribe((response: any) => {
                const presigned_posts = response.presigned_posts;
                for (const post of presigned_posts) {
                    const file = Array.from(files).filter(
                        (filterFile: File) => {
                            return (
                                post.data.fields.key ===
                                `${file_dir}/${filterFile.name}`
                            );
                        }
                    )[0];
                    this.uploadFileDirect(file, post.data, post.url, () => {
                        this.filesUploaded++;
                        if (
                            this.filesUploaded === this.filesToUpload &&
                            this.filesUploadFinished
                        )
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
            if (!response) {
                callbackFn();
            }
        });
    }

    downloadFile(filekey: string) {
        this.http.get(GetDownloadApiUrl(filekey)).subscribe((response: any) => {
            console.log('response from download file', response);
            if (!response.error) window.location.href = response.data;
            else {
                this.snackbarService.showErrorSnackBar(
                    "file not found, can't download"
                );
            }
        });
    }

    downloadAllFilesFromRecord(record: string): void {
        console.log('storage service now inbound');
        this.http
            .get(GetDownloadAllRecordDocumentsApiUrl(record))
            .subscribe((response: any) => {
                // console.log('response from downloader', response);
                // console.log('response from downloader length', response.length);
                // console.log('decoded', atob(response));

                // const bl = new Blob([response],  { "type": 'application/zip' });
                const bl2 = this.b64toBlob(response, 'application/zip', 512);
                FileSaver.saveAs(bl2, 'testzip.zip');
            });
    }


    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || 'application/zip';
        sliceSize = sliceSize || 512;
        const b64DataString = b64Data.substr(b64Data.indexOf(',') + 1);
        const byteCharacters = atob(b64DataString);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, {
            type: contentType
        });
        return blob;
    }
}
