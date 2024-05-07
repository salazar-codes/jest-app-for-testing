import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Cart component',()=>{

    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent> // Para extrar cosas del componente, un servicio por ejemplo

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
    })

    it('should create',()=>{
        expect(component).toBeTruthy();
        //expect(component).not.toBeTruthy();
    })

})