import {Page} from '@playwright/test'
import {GreenKartPage} from './greenkart-page'
import {LoginPracticePage} from './login-practice-page'
import {CartPage} from './cart-page'
import {AutomationPracticePage} from './automation-practice-page'
import { CheckoutPage} from './checkout-page'

export class PageManager{
    private greenKartPage: GreenKartPage
    private loginPracticePage: LoginPracticePage
    private cartPage: CartPage
    private automationPracticePage: AutomationPracticePage
    private checkoutPage: CheckoutPage

    constructor(page: Page){
        this.greenKartPage = new GreenKartPage(page)
        this.loginPracticePage = new LoginPracticePage(page)
        this.cartPage = new CartPage(page)
        this.automationPracticePage = new AutomationPracticePage(page)
        this.checkoutPage = new CheckoutPage(page)
    }

    getGreenKartPage() {
        return this.greenKartPage
    }

    getLoginPracticePage() {
        return this.loginPracticePage
    }
     getCartPage() {
        return this.cartPage
     }

     getAutomationPracticePage() {
        return this.automationPracticePage
     }

     getCheckoutPage() {
        return this.checkoutPage
     }
}