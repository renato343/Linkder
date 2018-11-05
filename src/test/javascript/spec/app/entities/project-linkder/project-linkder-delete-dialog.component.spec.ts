/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LinkderTestModule } from '../../../test.module';
import { ProjectLinkderDeleteDialogComponent } from 'app/entities/project-linkder/project-linkder-delete-dialog.component';
import { ProjectLinkderService } from 'app/entities/project-linkder/project-linkder.service';

describe('Component Tests', () => {
    describe('ProjectLinkder Management Delete Component', () => {
        let comp: ProjectLinkderDeleteDialogComponent;
        let fixture: ComponentFixture<ProjectLinkderDeleteDialogComponent>;
        let service: ProjectLinkderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LinkderTestModule],
                declarations: [ProjectLinkderDeleteDialogComponent]
            })
                .overrideTemplate(ProjectLinkderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProjectLinkderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectLinkderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
