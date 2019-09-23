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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShowGroupComponent} from './show-group.component';
import {GroupDetailsComponent} from '../group-details/group-details.component';
import {SharedModule} from '../../../shared/shared.module';
import {CoreSandboxService} from '../../services/core-sandbox.service';
import {RouterTestingModule} from '@angular/router/testing';
import {SnackbarService} from '../../../shared/services/snackbar.service';

describe('ShowGroupComponent', () => {
    let component: ShowGroupComponent;
    let fixture: ComponentFixture<ShowGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule],
            declarations: [ShowGroupComponent, GroupDetailsComponent],
            providers: [CoreSandboxService, SnackbarService],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShowGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
