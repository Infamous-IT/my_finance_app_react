import {FC, useState} from 'react';
import {Form, useLoaderData} from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';
import {IResponseTransactionLoader} from '../types/types.ts';
import CategoryModal from './CategoryModal.tsx';

export const TransactionForm: FC = () => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const {categories} = useLoaderData() as IResponseTransactionLoader;

    return (
        <div className='rounded-md bg-slate-800 p-4'>
            <Form
                className='grid gap-3'
                method='post'
                action='/transactions'
            >
                <label htmlFor='title'>
                    <span>Title</span>
                    <input
                        type="text"
                        className='input ml-3 w-[250px]'
                        placeholder='Enter transaction title...'
                        name='title'
                        required
                    />
                </label>
                <label htmlFor='amount'>
                    <span>Amount</span>
                    <input
                        type="number"
                        className='input ml-3 w-[250px]'
                        placeholder='Enter transaction amount...'
                        name='amount'
                        required
                    />
                </label>

                {/* Select */}
                {categories.length ? <label htmlFor="category" className="grid">
                    <span>Category</span>
                    <select name="category" className="input" required>
                        {categories.map((category, index) => (
                            <option key={index} value={category.id}>{category.title}</option>
                        ))}
                    </select>
                </label> : <h2 className='mt-1 text-red-300'>For continue you must be create category</h2>}

                <button
                    className="mt-3 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
                    onClick={() => setVisibleModal(true)}
                >
                    <FaPlus/>
                    <span>Manage categories</span>
                </button>

                {/* Radio buttons */}
                <div className="flex gap-4 items-center">
                    <label className='flex cursor-pointer items-center gap-2'>
                        <input
                            type="radio"
                            name='type'
                            value={'income'}
                            className='form-radio text-blue-500'
                        />
                        <span>Income</span>
                    </label>
                    <label className='flex cursor-pointer items-center gap-2'>
                        <input
                            type="radio"
                            name='type'
                            value={'expense'}
                            className='form-radio text-blue-500'
                        />
                        <span>Expense</span>
                    </label>
                </div>

                {/* Submit button */}
                <button
                    className='btn btn-sky max-w-fit mt-2'
                    type='submit'
                >
                    Submit
                </button>
            </Form>

            {visibleModal && (
                <CategoryModal type='post' setVisibleModal={setVisibleModal}/>
            )}
        </div>
    )
}

export default TransactionForm;