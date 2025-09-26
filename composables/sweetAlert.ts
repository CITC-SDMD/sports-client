import Swal from 'sweetalert2'

export function useSweetAlert() {
    function successSweetAlert(title: string, text: string) {
        Swal.fire({
            title: title,
            text: text,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Cancel!",
                    text: "Generate has been cancel.",
                    icon: "success"
                });
            }
        });
    }

    return { successSweetAlert }
}