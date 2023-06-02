export class Client {
    id: string=''
    fullName: string='';
    plate: string='';
    identification_type: number=1
    identification_number: string=''
    email: string=''
    phone: string=''
}
export const identification_types: any[] = [
    { id: 3, name: 'Cédula de ciudadanía' },
    { id: 1, name: 'Registro civil de nacimiento' },
    { id: 2, name: 'Tarjeta de identidad' },
    { id: 4, name: 'Tarjeta de extranjería' },
    { id: 5, name: 'Cédula de extranjería' },
    { id: 6, name: 'NIT' },
    { id: 7, name: 'Pasaporte' },
    { id: 8, name: 'Tipo de documento extranjero' },
]
