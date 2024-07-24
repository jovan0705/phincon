import { Box, Button } from "@chakra-ui/react";
const Pagination = ({ page, setPage, maxPage }) => {
  return (
    <Box display={"flex"}>
      <Button
        mx={"8px"}
        isDisabled={page === 1 ? true : false}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </Button>

      <Button mx={"8px"}>{page}</Button>

      <Button
        mx={"8px"}
        isDisabled={page === maxPage ? true : false}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination
