import { ReduceTextPipe } from "./reduce-text.pipe";

describe('ReduceTextPipe',()=>{
    
    let pipe: ReduceTextPipe;

    beforeEach(()=>{
        pipe = new ReduceTextPipe();
    });

    it('should create',() => {
        expect(pipe).toBeTruthy;
    })

    it('transform works correctly',()=>{
        const texto = 'Hello this is a test pleas check pipe';
        const newTest = pipe.transform(texto, 5);
        expect(newTest.length).toBe(5);
    });

});