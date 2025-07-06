export interface ISignIn{

    email: string;
    password: string;

}

export interface ISignUp{

    name: string;
    email: string;
    password: string;
    country: string;
    address: string;
    language: string;

}

export interface IUserConfig{

    name: string;
    email?: string;
    password?: string;
    country: string;
    address: string;
    language: string;

}

export interface IUserUpdate {
    open: boolean;
    onClose: () => void;
    onClick: (e:any) => void;
}