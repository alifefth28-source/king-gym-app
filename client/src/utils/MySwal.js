import Swal from 'sweetalert2';


const MySwal = {

    toast: (icon, title) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        Toast.fire({
            icon: icon, 
            title: title
        });
    },


    alert: (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            confirmButtonColor: '#4f46e5', 
            confirmButtonText: 'Oke, Siap!'
        });
    },


    confirm: async (title, text, confirmText = 'Ya, Lanjutkan!') => {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5', // Indigo
            cancelButtonColor: '#d33',     // Merah
            confirmButtonText: confirmText,
            cancelButtonText: 'Batal'
        });
    }
};

export default MySwal;