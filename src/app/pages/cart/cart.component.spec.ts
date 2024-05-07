import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from 'src/app/models/book.model';

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
    // Eventos que se ejecutan antes de los test a ejecutar
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
                BookService
            ],
            schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    })

    beforeEach(()=>{
        // Instanciamos el componente
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Hace lo que el ngOnInit
        service = fixture.debugElement.injector.get(BookService); // Instanciando el servicio de prueba
    })

    it('should create',()=>{
        expect(component).toBeTruthy();
        //expect(component).not.toBeTruthy();
    })

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
    })
    
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
})