import React from 'react';
import TodoInput from '../src/components/TodoInput';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

let [ addTodo ] = new Array(1).fill(jest.fn());

// extracting shallow render of component to function which can be imported to other test files, if required
function shallowSetup() {
    // sample props to pass to shallow render
    const props = {
        addTodo
    }

    // wrapper instance around rendered output
    const enzymeWrapper = shallow(<TodoInput {...props} />);

    return { enzymeWrapper, props };
}

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

        expect(enzymeWrapper.find('input').first().value).toBe('');
        expect(enzymeWrapper.find('input').prop(type).toEqual(type));
        expect(enzymeWrapper.contains(submitBtn)).toBeTruthy;

        console.log(enzymeWrapper.state());
        expect(enzymeWrapper.state().inputText).toEqual('');
    });
});

