import {FC, useState} from 'react';
import {AiFillEdit, AiFillCloseCircle} from 'react-icons/ai';
import {Form, useLoaderData} from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';
import CategoryModal from '../components/CategoryModal.tsx';
import {instance} from '../api/axios.api.ts';
import {ICategory} from '../types/types.ts';

export const categoriesAction = async ({request}: any) => {
    switch (request.method) {
        case 'POST': {
            const formData = await request.formData();
            const title = {
                title: formData.get('title'),
            };
            await instance.post('category', title)
            return null;
        }
        case 'PATCH': {
            const formData = await request.formData();
            const category = {
                id: formData.get('id'),
                title: formData.get('title'),
            }
            await instance.patch(`category/category/${category.id}`, category);
            return null;
        }
        case 'DELETE': {
            const formData = await request.formData();
            const categoryId = formData.get('id');
            await instance.delete(`category/category/${categoryId}`);
            return null;
        }
    }
}

export const categoryLoader = async () => {
    const {data} = await instance.get<ICategory[]>('category');
    return data;
}

const Category:FC = () => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const categories = useLoaderData() as ICategory[];

    return (
        <>
            <div className='mt-10 p-4 rounded-md bg-slate-800'>
                <h1>Your category list:</h1>
                { /*Category list*/}
                <div className='mt-2 flex flex-wrap items-center gap-2'>
                    {categories.map((category, index) => (
                        <div key={index} className='group py-2 px-4 rounded-lg bg-purple-600 flex items-center relative gap-2'>
                            {category.title}
                            <div
                                className="hidden group-hover:flex absolute px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between">
                                <button onClick={() => {
                                    setVisibleModal(true);
                                    setCategoryId(category.id);
                                    setIsEdit(true);
                                }}>
                                    <AiFillEdit/>
                                </button>
                                <Form className='flex' method='delete' action='/category'>
                                    <input type="hidden" name='id' value={category.id}/>
                                    <button type='submit'>
                                        <AiFillCloseCircle/>
                                    </button>
                                </Form>
                            </div>
                        </div>
                    ))}
                </div>

                {/*Add category*/}
                <button onClick={() => setVisibleModal(true)}
                        className='mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white'>
                    <FaPlus/>
                    <span>Create new category</span>
                </button>
            </div>

            {/*Add category modal*/}
            {visibleModal && <CategoryModal type={'post'} setVisibleModal={setVisibleModal}/>}

            {/*Edit category modal*/}
            {visibleModal && isEdit && <CategoryModal type={'patch'} id={categoryId} setVisibleModal={setVisibleModal}/>}
        </>
    )
}

export default Category;