export class Note {
    private _name: string = 'New Note';
    private _content: string='';
    private _created: Date;
    private _edited: Date;
    private _id;
    constructor(created: Date,id) {
        this._created = created;
        this._edited=created;
        this._id=id;
    }
    public get id(){
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get content(): string {
        return this._content;
    }
    public set content(value: string) {
        this._content = value;
    }
    public get created(): Date {
        return this._created;
    }
    public set created(value: Date) {
        this._created = value;
    }
    public get edited(): Date {
        return this._edited;
    }
    public set edited(value: Date) {
        this._edited = value;
    }
    

}