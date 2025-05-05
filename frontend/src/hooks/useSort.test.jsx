import React, {useState} from "react";
import { fireEvent, render, screen } from '@testing-library/react'
import useSort from "./useSort";

const dataToSort = [
    {
        "id": 1,
        "title": "The Adventures of Sherlock Holmes",
        "author": "Sir Authur Conan Doyle",
        "genre": "Mystery"
    },
    {
        "id": 2,
        "title": "Atomic Habits",
        "author": "James Clear",
        "genre": "Self Help"
    },
    {
        "id": 3,
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "genre": "Romance"
    },
]

function TestComponent() {
    const [data, setData] = useState(dataToSort);
    const [sort, setSort] = useState({ key: null, order: true });
    const { sortedData } = useSort(data, sort);

    return (
        <>
            <i className="bi bi-caret-up-fill" data-testid={"caret"} id={"title" + "caret"}></i>
            <button onClick={() => {setData(dataToSort); setSort({ key: "title", order: true})}}>ASC</button>
            <button onClick={() => {setData(dataToSort); setSort({ key: "title", order: false})}}>DESC</button>
            {sortedData.map(el => <p key={el.id}>{el.title}</p>)}
        </>
    );
}

let SherlockHolmes;
let AtomicHabits;
let PridePrejudice;
beforeEach(()=> {
    render(<TestComponent/>);
    SherlockHolmes = screen.getByText("The Adventures of Sherlock Holmes");
    AtomicHabits = screen.getByText("Atomic Habits");
    PridePrejudice = screen.getByText("Pride and Prejudice");
});

describe("useSort", () => {

    it('Should render initial data', () => {
        expect(SherlockHolmes.compareDocumentPosition(AtomicHabits)).toBe(4);
        expect(AtomicHabits.compareDocumentPosition(PridePrejudice)).toBe(4);
    });

    it('Should render data in ascending order', () => {
        expect(SherlockHolmes.compareDocumentPosition(AtomicHabits)).toBe(4);
        expect(AtomicHabits.compareDocumentPosition(PridePrejudice)).toBe(4);

        fireEvent.click(screen.getByRole('button', {name: "ASC"}))
        
        expect(AtomicHabits.compareDocumentPosition(PridePrejudice)).toBe(4);
        expect(PridePrejudice.compareDocumentPosition(SherlockHolmes)).toBe(4);
    });

    it('Should render data in descending order', () => {
        expect(SherlockHolmes.compareDocumentPosition(AtomicHabits)).toBe(4);
        expect(AtomicHabits.compareDocumentPosition(PridePrejudice)).toBe(4);

        fireEvent.click(screen.getByRole('button', {name: "DESC"}));
        
        expect(SherlockHolmes.compareDocumentPosition(PridePrejudice)).toBe(4);
        expect(PridePrejudice.compareDocumentPosition(AtomicHabits)).toBe(4);
    });

    it('Should render caret icon', () => {
        expect(screen.getByTestId("caret").className).toBe("bi bi-caret-up-fill");
    });

    it('Should render caret up icon', () => {
        expect(screen.getByTestId("caret").className).toBe("bi bi-caret-up-fill");

        fireEvent.click(screen.getByRole('button', {name: "ASC"}));
        
        expect(screen.getByTestId("caret").className).toBe("bi bi-caret-up-fill");
    });

    it('Should render caret down icon', () => {
        expect(screen.getByTestId("caret").className).toBe("bi bi-caret-up-fill");

        fireEvent.click(screen.getByRole('button', {name: "DESC"}));
        
        expect(screen.getByTestId("caret").className).toBe("bi bi-caret-down-fill");
    });
})