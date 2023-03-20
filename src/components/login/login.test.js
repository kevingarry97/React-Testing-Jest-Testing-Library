import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Login from "./login"

jest.mock("axios", () => ({
    __esModule: true,
    default: {
        get: () => ({
            data: {
                id: 1,
                name: 'John'
            }
        })
    }
}))

describe('Check if Username Inputs renders', () => {
    it('should render input', () => {
        render(<Login />);

        const userInputElement = screen.getByPlaceholderText(/username/i);
        expect(userInputElement).toBeInTheDocument();
    })
    it('should render empty value', () => {
        render(<Login />);

        const userInputElement = screen.getByPlaceholderText(/username/i);
        expect(userInputElement.value).toBe("");
    })

    it('should have test event', () => {
        render(<Login />)

        const userInputEl = screen.getByPlaceholderText(/username/i);
        const testValue = "";

        fireEvent.change(userInputEl, {target: {value: testValue}});

        expect(userInputEl.value).toBe(testValue);
    })
})

describe('Check if Password Inputs renders', () => {
    it('should render input', () => {
        render(<Login />);

        const userInputElement = screen.getByPlaceholderText(/password/i);
        expect(userInputElement).toBeInTheDocument();
    })
    it('should render empty value', () => {
        render(<Login />);

        const userInputElement = screen.getByPlaceholderText(/password/i);
        expect(userInputElement.value).toBe("");
    })
    it('should change the input', () => {
        render(<Login />);

        const userInputEl = screen.getByPlaceholderText(/password/i);
        let testValue = "";

        fireEvent.change(userInputEl, {target: { value: testValue }});
        expect(userInputEl.value).toBe(testValue)
    })
})

describe("Check Button Conditions", () => {
    it('should be disabled', () => {
        render(<Login />);

        const buttonEl = screen.getByRole('button');
        expect(buttonEl).toBeDisabled()
    })

    it('should not be disabled when inputs', () => {
        render(<Login />);

        const buttonEl = screen.getByRole('button');
        const userInputElement = screen.getByPlaceholderText(/username/i);
        const passwordInputEl = screen.getByPlaceholderText(/password/i);

        const testValue = "test"

        fireEvent.change(userInputElement, {target: {value: testValue}});
        fireEvent.change(passwordInputEl, {target: {value: testValue}});

        expect(buttonEl).not.toBeDisabled();
    })

    it('should not render loading at initial', () => {
        render(<Login />);

        const loadingEl = screen.getByRole('button');
        expect(loadingEl).not.toHaveTextContent(/please wait/i)
    })

    it('should render loading when you click', () => {
        render(<Login />); 

        const loadingEl = screen.getByRole('button');
        const userInputElement = screen.getByPlaceholderText(/username/i);
        const passwordInputEl = screen.getByPlaceholderText(/password/i);

        const testValue = "test"

        fireEvent.change(userInputElement, {target: {value: testValue}});
        fireEvent.change(passwordInputEl, {target: {value: testValue}});
        fireEvent.click(loadingEl)
        
        expect(loadingEl).toHaveTextContent(/please wait/i);
    })
    
    it('should not render loading after fetching', async () => {
        render(<Login />); 

        const loadingEl = screen.getByRole('button');
        const userInputElement = screen.getByPlaceholderText(/username/i);
        const passwordInputEl = screen.getByPlaceholderText(/password/i);

        const testValue = "test"

        fireEvent.change(userInputElement, {target: {value: testValue}});
        fireEvent.change(passwordInputEl, {target: {value: testValue}});
        fireEvent.click(loadingEl)
        
        await waitFor(() => expect(loadingEl).not.toHaveTextContent(/please wait/i))
    })

    it('should render user after fetching', async () => {
        render(<Login />); 

        const loadingEl = screen.getByRole('button');
        const userInputElement = screen.getByPlaceholderText(/username/i);
        const passwordInputEl = screen.getByPlaceholderText(/password/i);

        const testValue = "test"

        fireEvent.change(userInputElement, {target: {value: testValue}});
        fireEvent.change(passwordInputEl, {target: {value: testValue}});
        fireEvent.click(loadingEl)

        const userItem = await screen.findByText("John");
        
        expect(userItem).toBeInTheDocument();
    })
})

test('Error message should be visible', () => {
    render(<Login />);

    const errorEl = screen.getByTestId("error");
    expect(errorEl).not.toBeVisible();
})