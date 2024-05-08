import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { By } from '@angular/platform-browser';

const listCartBook: Book[] = [
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

describe('Cart component',()=>{

    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent> // Para extrar cosas del componente, un servicio por ejemplo
    let service: BookService;

    // Eventos que se ejecutan antes de CADA TEST
    beforeEach(()=>{
        // Configuramos los tests
        TestBed.configureTestingModule({
            // Para cuando se invocan servicios http, en el componente o en los servicios que lo invocan, para no hacer peticiones reales se usa el HttpClientTestingModule
            imports:[
                HttpClientTestingModule
            ],
            // Componentes que usamos en nuetros tests
            declarations:[
                CartComponent
            ],
            // Servicios que utiliza el componente
            providers:[
                BookService,
                //CartComponent
            ],
            schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    })

    // ngOnInit(): void {
    //     this.listCartBook = this._bookService.getBooksFromCart();
    //     this.totalPrice = this.getTotalPrice(this.listCartBook);
    //   }

    beforeEach(()=>{
        // Instanciamos el componente
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Hace lo que el ngOnInit
        service = fixture.debugElement.injector.get(BookService); // Instanciando el servicio de prueba
        jest.spyOn(service, 'getBooksFromCart').mockImplementation(()=> listCartBook); // mockeamos el método del ngOnInit necesario
    });

    // SE EJECUTA DESPUÉS DE CADA TEST
    afterEach(()=>{
        fixture.destroy();
        jest.resetAllMocks();
    });

    it('should create',()=>{
        expect(component).toBeTruthy();
        //expect(component).not.toBeTruthy();
    })

    // it('should create', inject([CartComponent],(cartComponent2:CartComponent)=>{
    //     expect(cartComponent2).toBeTruthy();
    // }));

    it('getTotalPrice returns an amount',()=>{
        // Simulando la llamada al mètodo
        const totalPrice = component.getTotalPrice(listCartBook);
        // que sea positivo
        expect(totalPrice).toBeGreaterThan(0);
        expect(totalPrice).not.toBe(0);
        expect(totalPrice).not.toBeNull();
    });

    it('onInputNumberChange increments correctly',()=>{

        const action = 'plus';
        const book = listCartBook[0];

        // Los espias, espian un método y comprueban que se llame bien. Nuestros test no deben llamar a otros servicios, hay que simularlo.
        const spy1 = jest.spyOn(service, 'updateAmountBook').mockImplementation( () => null ); // No llama al servicio sino simula y devuelve lo de la función, en este caso, null

        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation( () => null ); // ahora simulamos la llamada al método getTotalPrice del componente

        expect(book.amount).toBe(2);

        // Primero definir los espías antes de la llamada al método
        component.onInputNumberChange(action, book);

        // debe haber incrementado
        expect(book.amount).toBe(3);
        
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
    });
    
    it('onInputNumberChange minus correctly',()=>{

        const action = 'minus';
        const book = listCartBook[0];

        // Los espias, espian un método y comprueban que se llame bien. Nuestros test no deben llamar a otros servicios, hay que simularlo.
        const spy1 = jest.spyOn(service, 'updateAmountBook').mockImplementation( () => null ); // No llama al servicio sino simula y devuelve lo de la función, en este caso, null

        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation( () => null ); // ahora simulamos la llamada al método getTotalPrice del componente
        expect(book.amount).toBe(3);
        // Primero definir los espías antes de la llamada al método
        component.onInputNumberChange(action, book);
        expect(book.amount).toBe(2);
        //expect(book.amount == 2).toBe(2); // Otra forma
        
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);

    })
    
    it('onClearBooks works correctly',()=>{
        // vamos a mockear al método removeBooksFromCart que se llama en el privado
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation(() => null);
        // agregar "as any" para espiar el método privado, en este caso no sea mockea porque queremos que se ejecuten las líneas del método privado, daría error el test del método removeBooksFromCart porque no se llamaría
        const spy2 = jest.spyOn(component as any,'_clearListCartBook'); // espiar métodos privados
        
        component.listCartBook = listCartBook;
        component.onClearBooks();
        expect(component.listCartBook.length).toBe(0); // la lista se debe borrar
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
    });

    // fdescribe funciona igual
    // fit: para ejecutar solo este test por archivo
    // it.only para ejecutar solo este test por archivo
    // xit: skip test - aplica para describe
    it('_clearListCartBook works correctly',()=>{
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation(() => null);
        component.listCartBook = listCartBook;
        component["_clearListCartBook"](); // Otra forma de ejecutar métodos privados - NO RECOMENDABLE?
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalledTimes(1);
    });

    // public onClearBooks(): void {
    //     if (this.listCartBook && this.listCartBook.length > 0) {
    //       this._clearListCartBook();
    //     } else {
    //        console.log("No books available");
    //     }
    //   }
    
    //   private _clearListCartBook() {
    //     this.listCartBook = [];
    //     this._bookService.removeBooksFromCart();
    //   }

    // EJEMPLOS DE TEST DE INTEGRACIÓN
    it('title "cart is empty" is not displayed when there is a list of books',()=>{
        component.listCartBook = listCartBook;

        fixture.detectChanges(); // Le decimos a Angular que actualice su vista 
        const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));

        expect(debugElement).toBeFalsy();
    });

    it('title "cart is empty" is displayed correctly when the list is empty',()=>{
        component.listCartBook = [];
        fixture.detectChanges(); // Le decimos a Angular que actualice su vista 
        const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
        expect(debugElement).toBeTruthy();

        if(debugElement){
            const element: HTMLElement = debugElement.nativeElement;
            expect(element.innerHTML).toContain('The cart is empty');
        }

    });
})