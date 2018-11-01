import React from 'react';
import { shallow } from 'enzyme';

import { Pagination } from '../Pagination';


describe('<Pagination />', () => {
        it('renders pagination', () => {
            const wrapper = shallow(<Pagination pagination={{page: 1, totalPages: 5}}/>);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders two buttons', () => {
            const wrapper = shallow(<Pagination pagination={{page: 1, totalPages: 5}}/>);
            expect(wrapper.find('Button').length).toEqual(2);
        });
});