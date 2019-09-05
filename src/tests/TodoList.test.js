import React from 'react';
import TodoList from '../components/TodoList';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

let [ dispatch ] = new Array(1).fill(jest.fn());
function shallowSetup() {
    const props = {
        todos : [],
        dispatch
    };

    // wrapper instance around rendered output        
    const enzymeWrapper = shallow(<TodoList {...props} />);

    return {
        props, enzymeWrapper
    };
}

// snapshot test; create a new snapshot if not available
// if snapshot available, test it aganist stored snapshot copy
// basically it creates a stringified format of component with all DOM elements inside the component
describe("Snapshot test for TodoList component", () => {
    test("Create a snaphot if not available and compare", () => {
        const { props, enzymeWrapper } = shallowSetup();

        expect(toJson(enzymeWrapper)).toMatchSnapshot();
    });
});

describe('Shallow rendered TodoList', () => {
    test('it should render proper UI when Todos not present', () => {
        const { enzymeWrapper } = shallowSetup();
        expect(enzymeWrapper.containsMatchingElement(<div>Loading</div>)).toBeTruthy;
    });

    test('it should render list of todos with buttons', () => {
        const props = {
            dispatch,
            todos: [
                {
                    text: 'Car driving',
                    isCompleted: false,
                    id: Date.now()
                }
            ]
        };

        const enzymeWrapper = shallow(<TodoList {...props} />);

        expect(enzymeWrapper.find('p').text()).toBe('Car driving');
        expect(enzymeWrapper.find('button').first().hasClass('btn-outline-primary')).toBeTruthy;
        expect(enzymeWrapper.find('button').last().hasClass('btn-outline-danger')).toBeTruthy;
        expect(enzymeWrapper.find('p').hasClass('completed')).not.toBeTruthy;
    })

    test('it should render completed todo', () => {
        const props = {
            dispatch,
            todos: [
                {
                    text: 'Jogging',
                    isCompleted: true,
                    id: Date.now()
                }
            ]
        };

        const enzymeWrapper = shallow(<TodoList {...props} />);

        expect(enzymeWrapper.find('p').text()).toBe('Jogging');
        expect(enzymeWrapper.find('p').hasClass('completed')).toBeTruthy;
    });
});
