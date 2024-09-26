import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText(/Contact Form/i);
    expect(header).toBeInTheDocument();   
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstnameInput = screen.getByLabelText("First Name*");
    const lastnameInput = screen.getByLabelText("Last Name*");
    const emailInput = screen.getByLabelText("Email*");
    const messageInput = screen.getByLabelText("Message");
    const submitButton = screen.getByTestId("submitButton");
    
    userEvent.type(firstnameInput, "Wes");
    userEvent.type(lastnameInput, "Woodard");
    userEvent.type(emailInput, "westonwoodard28@gmail.com");
    userEvent.type(messageInput, "abra kadabra alakazam");
    userEvent.click(submitButton);

    await waitFor(() => {
        const fnError = screen.queryByText(/Error: firstName must have at least 5 characters./i);
        const lnError = screen.queryByText(/Error: lastName is a required field./i);
        const eError = screen.queryByText(/Error: email must be a valid email address./i);
        expect(fnError).toBeInTheDocument();
        expect(lnError).not.toBeInTheDocument();
        expect(eError).not.toBeInTheDocument();
    }) 
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByTestId("submitButton");

    userEvent.click(submitButton);

    await waitFor(() => {
        const fnError = screen.queryByText(/Error: firstName must have at least 5 characters./i);
        const lnError = screen.queryByText(/Error: lastName is a required field./i);
        const eError = screen.queryByText(/Error: email must be a valid email address./i);
        expect(fnError).toBeInTheDocument();
        expect(lnError).toBeInTheDocument();
        expect(eError).toBeInTheDocument();
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    
    const firstnameInput = screen.getByLabelText("First Name*");
    const lastnameInput = screen.getByLabelText("Last Name*");
    const submitButton = screen.getByTestId("submitButton");

    userEvent.type(firstnameInput, "Weston");
    userEvent.type(lastnameInput, "Woodard");
    userEvent.click(submitButton);

    await waitFor(() => {
        const fnError = screen.queryByText(/Error: firstName must have at least 5 characters./i);
        const lnError = screen.queryByText(/Error: lastName is a required field./i);
        const eError = screen.queryByText(/Error: email must be a valid email address./i);
        expect(fnError).not.toBeInTheDocument();
        expect(lnError).not.toBeInTheDocument();
        expect(eError).toBeInTheDocument();
    })
      
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText("Email*");

    userEvent.type(emailInput, "wubbalubbadubdub");
    
    await waitFor(() => {
        const fnError = screen.queryByText(/Error: firstName must have at least 5 characters./i);
        const lnError = screen.queryByText(/Error: lastName is a required field./i);
        const eError = screen.queryByText(/Error: email must be a valid email address./i);
        expect(fnError).not.toBeInTheDocument();
        expect(lnError).not.toBeInTheDocument();
        expect(eError).toBeInTheDocument();
    })    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const firstnameInput = screen.getByLabelText("First Name*");
    const emailInput = screen.getByLabelText("Email*");
    const messageInput = screen.getByLabelText("Message");
    const submitButton = screen.getByTestId("submitButton");
    
    userEvent.type(firstnameInput, "Weston");
    userEvent.type(emailInput, "westonwoodard28@gmail.com");
    userEvent.type(messageInput, "abra kadabra alakazam");
    userEvent.click(submitButton);

    await waitFor(() => {
        const fnError = screen.queryByText(/Error: firstName must have at least 5 characters./i);
        const lnError = screen.queryByText(/Error: lastName is a required field./i);
        const eError = screen.queryByText(/Error: email must be a valid email address./i);
        expect(fnError).not.toBeInTheDocument();
        expect(lnError).toBeInTheDocument();
        expect(eError).not.toBeInTheDocument();
    })   
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstnameInput = screen.getByLabelText("First Name*");
    const lastnameInput = screen.getByLabelText("Last Name*");
    const emailInput = screen.getByLabelText("Email*");
    const submitButton = screen.getByTestId("submitButton");
    
    userEvent.type(firstnameInput, "Weston");
    userEvent.type(lastnameInput, "Woodard");
    userEvent.type(emailInput, "westonwoodard28@gmail.com");
    userEvent.click(submitButton);

    await waitFor(() => {
        const fnSubmitted = screen.queryByText(/First Name:/i);
        const lnSubmitted = screen.queryByText(/Last Name:/i);
        const eSubmitted = screen.queryByText(/Email:/i);
        const mSubmitted = screen.queryByText(/Message:/i);
        expect(fnSubmitted).toBeInTheDocument();
        expect(lnSubmitted).toBeInTheDocument();
        expect(eSubmitted).toBeInTheDocument();
        expect(mSubmitted).not.toBeInTheDocument();
    })   
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstnameInput = screen.getByLabelText("First Name*");
    const lastnameInput = screen.getByLabelText("Last Name*");
    const emailInput = screen.getByLabelText("Email*");
    const messageInput = screen.getByLabelText("Message");
    const submitButton = screen.getByTestId("submitButton");
    
    userEvent.type(firstnameInput, "Weston");
    userEvent.type(lastnameInput, "Woodard");
    userEvent.type(emailInput, "westonwoodard28@gmail.com");
    userEvent.type(messageInput, "abra kadabra alakazam");
    userEvent.click(submitButton);

    await waitFor(() => {
        const fnSubmitted = screen.queryByText(/First Name:/i);
        const lnSubmitted = screen.queryByText(/Last Name:/i);
        const eSubmitted = screen.queryByText(/Email:/i);
        const mSubmitted = screen.queryByText(/Message:/i);
        expect(fnSubmitted).toBeInTheDocument();
        expect(lnSubmitted).toBeInTheDocument();
        expect(eSubmitted).toBeInTheDocument();
        expect(mSubmitted).toBeInTheDocument();
    })
    
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByTestId("submitButton");
    
    userEvent.click(submitButton);

    await waitFor(() => {
        const fnError = screen.queryByText(/Error: firstName must have at least 5 characters./i);
        const lnError = screen.queryByText(/Error: lastName is a required field./i);
        const eError = screen.queryByText(/Error: email must be a valid email address./i);
        expect(fnError).toBeInTheDocument();
        expect(lnError).toBeInTheDocument();
        expect(eError).toBeInTheDocument();
    })   
});