import React from 'react';
import TodoInput from './TodoInput';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { stringTypeAnnotation } from '@babel/types';

let [ addTodo, dispatch ] = new Array(2).fill(jest.fn());
function shallowSetup() {
    const props = {
        addTodo,
        dispatch
    };

    // wrapper instance around rendered output        
    const enzymeWrapper = shallow(<TodoInput {...props} />);

    return {
        props, enzymeWrapper
    };
}

describe('Component methods', () => {
    test('Input change', () => {
        const { enzymeWrapper } = shallowSetup();
        enzymeWrapper.find('input').first().simulate('change', {
            target: {
                value: 'Go for car driving in morning'
            }
        });
        expect(enzymeWrapper.state().inputText).toBe('Go for car driving in morning');
    });

    test('Form submit', () => {
        const { enzymeWrapper } = shallowSetup();
        enzymeWrapper.find('form').first().simulate('submit', {
            preventDefault: () => {}
        });
        expect(enzymeWrapper.state().inputText).toBe('');
    });
});


// snapshot test; create a new snapshot if not available
// if snapshot available, test it aganist stored snapshot copy
// basically it creates a stringified format of component with all DOM elements inside the component
describe("Snapshot test for TodoInput component", () => {
    test("Create a snaphot if not available and compare", () => {
        const { props, enzymeWrapper } = shallowSetup();

        expect(toJson(enzymeWrapper)).toMatchSnapshot();
    });
});

describe('Shallow rendered TodoInput', () => {
    test('it should render form with an input and submit', () => {
        const { enzymeWrapper } = shallowSetup();
        const type = 'text';
        const submitBtn = <button class='btn btn-primary'>Add</button>;

        expect(enzymeWrapper.contains(submitBtn)).toBeTruthy;
        console.log(enzymeWrapper.state());
        expect(enzymeWrapper.state().inputText).toEqual('');
    });
});
