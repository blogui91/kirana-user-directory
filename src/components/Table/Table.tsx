import { useMemo, useState } from "react";

import { TableProps } from "./types";
import { Loader } from "../Loader";
import { paginate } from "../../utils/pagination";
import { TableRow } from "./TableRow";

const Table = ({ data, isLoading, isLoaded }: TableProps) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  /* We remove the identical items from the list and get only those items with at leas a duplicated value */
  const duplicatedItems = useMemo(() => {
    return data
      .filter((item) => !item.isDuplicate)
      .filter((item) => {
      return [item.isEmailDuplicate, item.isPhoneDuplicate, item.isNameDuplicate].some((item) => item);
    }).length;
  }, [data]);

  const handleOnChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPage = Number(event.target.value);
    setPerPage(newPage);
  }

  const items = useMemo(() => {
    return data.filter((item) => !item.isDuplicate);
  }, [data]);

  const paginatedList = useMemo(() => {
    return paginate(items, perPage, page);
  }, [page, items, perPage]);

  const moveNext = () => {
    setPage((prev) => prev + 1);
  }

  const movePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  const goFirst = () => {
    setPage(1);
  }

  const goLast = () => {
    setPage(Math.ceil(data.length / perPage));
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoaded) {
    return null;
  }

  return (
    <div>
      <h1 className="py-3 mb-3 text-3xl font-bold"> Directory </h1>

      <div className="w-full overflow-x-auto p-5 bg-white max-h-[720px] rounded-md overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500 bg-white rounded">
          <caption className="caption-top py-3 text-left">
            <h3>
              There are <b> {duplicatedItems}</b> duplicated values
            </h3>
          </caption>

          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
            </tr>
          </thead>

          <tbody>
            {paginatedList.map((user) => (
              <TableRow user={user} key={user.id} />
            ))}
          </tbody>
        </table>
        
      </div>

      <div className="pagination p-2 justify-between flex-col sm:flex-row bg-white mt-1 items-center rounded flex gap-3">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-700">
              {items.length} items in total
            </span>

            <select value={perPage} className="border h-[44px] rounded-md border-gray-300" onChange={e => handleOnChangePerPage(e)}>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
              <option value="200">200 per page</option>
            </select>
          </div>

          <div className="flex gap-3 flex-col sm:flex-row items-center">
            <span className="text-sm text-gray-700">
              Page {page} of {Math.ceil(data.length / perPage)}
            </span>
            <div className="flex gap-2">
              <button
                onClick={goFirst}
                disabled={page === 1}
                className="btn btn-success"
              >
                First
              </button>
              <button
                onClick={movePrev}
                disabled={page === 1}
                className="btn btn-primary"
              >
                Prev
              </button>

              <button
                onClick={moveNext}
                disabled={page === Math.ceil(data.length / perPage)}
                className="btn btn-primary"
              >
                Next
              </button>
              <button
                onClick={goLast}
                disabled={page === Math.ceil(data.length / perPage)}
                className="btn btn-success"
              >
                Last
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Table;
