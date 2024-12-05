export class User{
    id?:any;
    name?: string;
    username?: string;
    password?: string;
    age?:number;
    email?:string;
    bplace?:string;
    status?:string;
    ageInYears?:number;

    roles?: Role[]; 
  constructor(data?: any) {
    this.id = data?.id;
    this.username = data?.username;
    this.password = data?.password;
    this.name = data?.name;
    this.age = data?.age;
    this.email=data?.email;
    this.bplace = data?.szhely;
    this.status = data?.status;
    this.ageInYears = data?.ageInYears;
    this.roles = data?.roles ? data.roles.map((role: any) => new Role(role)) : [];
  }
}

export class Role {
  id?: number;
  name?: string;
  roles?: string;

  constructor(data?: any) {
    this.id = data?.id;
    this.name = data?.name;
    this.roles = data?.roles;
  }
}