import React from 'react';
import { App } from './App';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

// extracting shallow render of component to function which can be imported to other test files, if required
const shallowSetup = () => {
    const [ dispatch ] = new Array(1).fill(jest.fn()); 
    const props = {
        todos: [],
        dispatch
    }

    const enzymeWrapper = shallow(<App {...props} />);

    return {
        props, enzymeWrapper
    }
}

// snapshot test; create a new snapshot if not available
// if snapshot available, test it aganist stored snapshot copy
// basically it creates a stringified format of component with all DOM elements inside the component
describe("Snapshot test for App component", () => {
    test("Create a snaphot if not available and compare", () => {
        const { props, enzymeWrapper } = shallowSetup();
        expect(toJson(enzymeWrapper)).toMatchSnapshot();
    });
});

// test for elements within the wrapper with classes for text, props, etc
describe("Testing rendering of App component", () => {
    test("should render without crashing", () => {
        const { props, enzymeWrapper } = shallowSetup();        
        const para = <p>resize this responsive page to see the effect!</p>;

        expect(enzymeWrapper.find('.jumbotron h1').text()).toBe('ToDo App Page');
        expect(enzymeWrapper.find('.jumbotron').props().className).toContain('jumbotron text-center');
        expect(enzymeWrapper.find('.jumbotron p').text()).toEqual('Resize this responsive page to see the effect!');
        expect(enzymeWrapper.find('.container').length).toBe(1);
        
        expect(enzymeWrapper.contains(para)).toBeTruthy;
        // console.log(enzymeWrapper.state());
        // expect(enzymeWrapper.state().todos.length).toEqual(0);
    });
});
