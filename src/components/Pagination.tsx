import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
interface Props {
  count: number;
  page: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}
export const Paginator: React.FC<Props> = (props) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={props.count}
        page={props.page}
        onChange={props.handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};

export default Paginator;
