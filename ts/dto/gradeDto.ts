export class Grade {
    private id: number;
    private code: string;
    private name: string;


    constructor(id: number, code: string, name: string) {
        this.id = id;
        this.code = code;
        this.name = name
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}
