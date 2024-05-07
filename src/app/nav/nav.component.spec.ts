import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavComponent } from "./nav.component"
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

// Clase para evitar el import innecesario de componentes de rutas
class ComponentTestRoute {}

describe('navComponent',()=>{

    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[
                RouterTestingModule.withRoutes([
                    {path: 'home', component: ComponentTestRoute},
                    {path: 'cart', component: ComponentTestRoute},
                ])
            ],
            declarations:[
                NavComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    })

    beforeEach(()=>{
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create',()=>{
        expect(component).toBeTruthy;
    })

    it('should navigate',()=>{

        const router = TestBed.inject(Router);
        const spy1 = jest.spyOn(router,'navigate');

        component.navTo('home');

        expect(spy1).toHaveBeenCalledWith(['/home']);
    })


    // navTo(path:string): void {
    //     this.router.navigate([`/${path}`]);
    //   }
})