import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridApi } from 'ag-grid-community';

// for demo purpuse about how we should create abstract class for handling widely use components
export abstract class ListView<T> {
    entityName = "";
    protected _gridApi: GridApi<T> | undefined;

    onGridReady(params: any) {
        this._gridApi = params.api;
    }

}
