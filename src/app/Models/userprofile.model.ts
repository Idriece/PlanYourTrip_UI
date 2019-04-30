import { UserInterest } from 'src/app/Models/user-interest';

export class Userprofile {
    // Id : number;
    // FirstName : string;
    // LastName : string;
    // Email :string;
    // UserName:string;
    // PhoneNumber: number;
    public UserId: string;
    public FirstName: string;
    public LastName: string;
    public UserName: string;
    public Email: string;
    public PhoneNumber: number;
    public Interests: UserInterest[];
    public City: string;
    public PasswordHash: string;

}

