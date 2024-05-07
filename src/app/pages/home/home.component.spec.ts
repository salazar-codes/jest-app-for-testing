import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component"
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "../../services/book.service";
import { Book } from "src/app/models/book.model";
import { of } from "rxjs";

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

describe('Home Component',()=>{

    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            declarations:[
                HomeComponent
            ],
            providers:[
                BookService
            ],
            schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
        })
    })

    beforeEach(()=>{
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create',()=>{
        expect(component).toBeTruthy();
    });
    
    it('getBook get books from subscription',()=>{
        const bookService = fixture.debugElement.injector.get(BookService);
        const spy1 = jest.spyOn(bookService,'getBooks').mockReturnValueOnce(of(listCartBook)); // el espía devuelve un observable

        component.getBooks();
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(component.listBook.length).toBe(3);
        expect(component.listBook).toEqual(listCartBook);
    })

    // this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
    //     this.listBook = resp;
    //   });

});