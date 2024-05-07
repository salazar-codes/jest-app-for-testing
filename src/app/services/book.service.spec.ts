import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BookService } from "./book.service"
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "../../environments/environment";
import swal from 'sweetalert2';

const listBook: Book[] = [
    {   
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2,
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1,
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7,
    }
];

// Prototyping localStorage
const mock = () => {
    let storage: { [key: string]: string } = {};
    return {
        getItem: (key: string) => (key in storage ? storage[key]: null),
        setItem: (key: string, value: string) => (storage[key] = value),
        removeItem: (key: string) => delete storage[key],
        clear: () => (storage = {}),
    };
};
 
Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
    value: () => ['-webkit-appearance'],
});
 
Object.defineProperty(document.body.style, 'transform', {
    value: () => {
        return {
            enumerable: true,
            configurable: true
        };
    },
});
// Prototyping localStorage END

describe('BookService',()=>{

    let service: BookService;
    let httpMock: HttpTestingController; // Para no hacer peticiones reales

    // Configuraciones
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            providers:[
                BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(()=>{
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
    })

    afterEach(() => {
        localStorage.clear();
        jest.resetAllMocks();
        httpMock.verify(); // Verifica que no haya peticiones pendientes antes de pasar a otro test
    })

    it('should create', ()=>{
        expect(service).toBeTruthy();
    })

    it('getBooks return a list of book and does a get method', ()=>{
        service.getBooks().subscribe((resp: Book[])=> {
            expect(resp).toEqual(listBook); // Verificamos que llegue el resultado esperado
        });

        const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
        expect(req.request.method).toBe('GET'); // verificamos que se llame un método GET
        //expect(req.request.method).toBe('POST');
        req.flush(listBook); // simular la petición http
    })

    it('getBooksFromCart returns an empty array when LS is empty',()=>{
        const listaLibros = service.getBooksFromCart();
        expect(listaLibros.length).toBe(0);
    })

    it('getBooksFromCart returns an array of books when exists in LS',()=>{
        localStorage.setItem('listCartBook', JSON.stringify(listBook));
        const newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(3);
    })
    
    it('addBookToCart adds a book successfully when list doesnt exist in LS',()=>{
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2,
        };

        const toastMock = {
            fire:() => null
        } as any;
        const spy1 = jest.spyOn(swal,'mixin').mockImplementation(()=>{
            return toastMock;
        });
        
        let newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(0);

        service.addBookToCart(book);

        newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(1);

        expect(spy1).toHaveBeenCalledTimes(1);
    })

    it('addBookToCart adds a book successfully when list exists in LS and if book exists',()=>{

        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2,
        };
        
        localStorage.setItem('listCartBook', JSON.stringify(listBook));

        const toastMock = {
            fire:() => null
        } as any;
        const spy1 = jest.spyOn(swal,'mixin').mockImplementation(()=>{
            return toastMock;
        });
        
        let newListBook = service.getBooksFromCart();
        expect(newListBook[0].amount).toBe(2);

        service.addBookToCart(book);

        newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(3);
        expect(newListBook[0].amount).toBe(3);

        expect(spy1).toHaveBeenCalledTimes(1);
    })

    it('removeBooksFromCart removes LS items correctly',()=>{
        localStorage.setItem('listCartBook', JSON.stringify(listBook));

        service.removeBooksFromCart();

        const newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(0);
    })
})