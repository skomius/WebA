export interface ICar{
    v8: string,
    func: () => string
}

export class Car implements ICar { 

    engine: string;

    public v8: "BMW"; // public v8: string = "BMW" 

    constructor(engine: string) {
        this.engine = engine
    }

    public func(): string {
        return "ratai"
    }
    
    disp(): void {
        console.log("Engine is : " + this.engine)
    }
} 