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

import {Tag} from './tag.model';

export class RecordDocument {
    constructor(
        public id: number,
        public name: string,
        public creator: string,
        public created_on: Date,
        public last_edited: Date,
        public file_size: number,
        public tags: Tag[]
    ) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.created_on = created_on;
        this.last_edited = last_edited;
        this.file_size = file_size;
        this.tags = tags;
    }

    static getRecordDocumentsFromJsonArray(jsonArray){
        const recordDocuments: RecordDocument[] = [];
        Object.values(jsonArray).map(jsonRecordDocument => {
            recordDocuments.push(RecordDocument.getRecordDocumentFromJson(jsonRecordDocument));
        });
        return recordDocuments;
    }

    static getRecordDocumentFromJson(json) {
        let name = json.name;
        if (name.split('/').length > 1)
            name = name.split('/').pop();

        return new RecordDocument(
            json.id,
            name,
            json.creator,
            json.created_on,
            json.last_edited,
            json.file_size,
            Tag.getTagsFromJsonArray(json.tagged)
        );
    }
}
