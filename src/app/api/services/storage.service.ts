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
import { GetDownloadUrl, GetUploadUrl } from "../../statics/api_urls.statics";
import { ApiSandboxService } from "./api-sandbox.service";
import {SnackbarService} from '../../shared/services/snackbar.service';

@Injectable()
export class StorageService {
    constructor(private http: HttpClient,
                private snackbarService: SnackbarService
    ) {}

    uploadFile(file: File, fileDir: string) {
        this.http
            .get(GetUploadUrl(file, fileDir))
            .subscribe((response: any) => {
                this.uploadFileDirect(file, response.data, response.url);
            });
    }

    private uploadFileDirect(
        file: File,
        s3Data: { url: string; fields: any },
        url: string
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
                this.snackbarService.showSuccessSnackBar("file successfully uploaded");
            }
        });
    }

    downloadFile(filekey: string) {
        this.http.get(GetDownloadUrl(filekey)).subscribe((response: any) => {
            if (!response.error) window.location.href = response.data;
            else {
                this.snackbarService.showErrorSnackBar("file not found, can't download");
            }
        });
    }
}
