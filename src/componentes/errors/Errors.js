import swal from 'sweetalert2';
import history from '../../history';

export const TYPE_ERROR_FORBIDDEN = 1;
export const TYPE_ERROR_OUT_OF_CONTROL = 2;

export default class Errors {
    constructor() {
        this.showError = this.showError.bind(this);
        this.showErrorForbidden = this.showErrorForbidden.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.getModalAlert = this.getModalAlert.bind(this);
    }

    showErrorForbidden() {
        this.showError('Area restringida',
            'No tienes permisos para acceder a las secciones. Si deberias habla con tu responsable',
            TYPE_ERROR_FORBIDDEN);
    }


    showSuccess(title,text) {
        swal(
            `${title}`,
            `${text}`,
            'success'
        );
    }

    showError(title, text,typeOfError = TYPE_ERROR_OUT_OF_CONTROL) {
        swal({
            type: 'error',
            title: `${title}`,
            text: `${text}`
            // footer: '<a href>Why do I have this issue?</a>'
        });
        if (typeOfError === TYPE_ERROR_FORBIDDEN) {
            history.push('/home');
        }
    }

    getModalAlert(title,text,confirmButtonText) {
        return swal({
            title: `${title}`,
            text: `${text}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `${confirmButtonText}`,
            cancelButtonText: 'Cancelar'
        });
    }
}