import {FC, useEffect, useState} from 'react';
import {FaTrash} from 'react-icons/fa';
import {Form, useLoaderData} from 'react-router-dom';
import {IResponseTransactionLoader, ITransaction, ITransactionTable} from '../types/types.ts';
import {formatDate} from '../helpers/date.helper.ts';
import {formatToUSD} from '../helpers/currency.helper.ts';
import {instance} from '../api/axios.api.ts';
import ReactPaginate from 'react-paginate';

export const TransactionTable: FC<ITransactionTable> = ({limit = 3}) => {
    const {transactions} = useLoaderData() as IResponseTransactionLoader;
    const [data, setData] = useState<ITransaction[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const fetchTransactions = async (page: number) => {
        const response =
            await instance.get(`/transactions/pagination?page=${page}&limit=${limit}`);
        setData(response.data);
        setTotalPages(Math.ceil(transactions.length / limit));
    }

    const handlePageChange = (selectedItem: {selected: number}) => {
        setCurrentPage(selectedItem.selected + 1);
    }

    useEffect(() => {
        fetchTransactions(currentPage);
    }, [currentPage, transactions])

    return (
        <>
            <ReactPaginate
                className='flex gap-3 justify-end mt-4 items-center'
                activeClassName='bg-blue-600 rounded-sm'
                pageLinkClassName='text-white text-xs py-1 px-2 rounded-sm'
                previousClassName='text-white py-1 px-2 rounded-sm text-xs bg-slate-800 w-[200] h-[200]'
                nextClassName='text-white py-1 px-2 rounded-sm text-xs bg-slate-800 w-[200] h-[200]'
                disabledClassName='text-white/50 cursor-not-allowed'
                disabledLinkClassName='text-slate-600 cursor-not-allowed'
                pageCount={totalPages}
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
            />
            <div className='bg-slate-800 px-4 py-3 mt-4 rounded-md'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <td className='font-bold'>#</td>
                            <td className='font-bold'>Title</td>
                            <td className='font-bold'>Amount($)</td>
                            <td className='font-bold'>Category</td>
                            <td className='font-bold'>Creation date</td>
                            <td className='text-right'>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((transaction, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{transaction.title}</td>
                            <td
                                className={
                                    transaction.type === 'income'
                                        ? 'text-green-500'
                                        : 'text-red-400'}>
                                {transaction.type === 'income'
                                    ? `+  ${formatToUSD.format(transaction.amount)}`
                                    : `-  ${formatToUSD.format(transaction.amount)}`}
                            </td>
                            <td>{transaction.categories?.title || 'Other'}</td>
                            <td>{formatDate(transaction.createdAt)}</td>
                            <td>
                                <Form
                                    method='delete'
                                    action='/transactions'
                                >
                                    <input type="hidden" name='id' value={transaction.id}/>
                                    <button className="btn hover:btn-rose ml-auto">
                                        <FaTrash/>
                                    </button>
                                </Form>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TransactionTable;