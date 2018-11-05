import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompanyLinkder } from 'app/shared/model/company-linkder.model';
import { CompanyLinkderService } from './company-linkder.service';

@Component({
    selector: 'jhi-company-linkder-delete-dialog',
    templateUrl: './company-linkder-delete-dialog.component.html'
})
export class CompanyLinkderDeleteDialogComponent {
    company: ICompanyLinkder;

    constructor(private companyService: CompanyLinkderService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.companyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'companyListModification',
                content: 'Deleted an company'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-company-linkder-delete-popup',
    template: ''
})
export class CompanyLinkderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ company }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CompanyLinkderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.company = company;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
