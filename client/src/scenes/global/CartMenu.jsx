import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Close, Add, Remove } from "@mui/icons-material";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  setIsCartOpen,
  increaseCount,
  decreaseCount,
  removeFromCart,
} from "../../state";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.count * item.attributes.price,
    0
  );

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0,0,0,0.4)"
      position="fixed"
      zIndex="10"
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px,30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen())}>
              <Close />
            </IconButton>
          </FlexBox>
          {/* cart list */}
          <Box>
            {cart.map((item) => (
              <Box key={item.id}>
                <FlexBox padding="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      src={`http://localhost:1337/${item?.attributes?.iamge?.data?.attributes?.formats?.medium?.url}`}
                      alt={item?.attributes.name}
                      width="123px"
                      height="164px"
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item?.attributes?.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          //test just sending item.id instead
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <Close />
                      </IconButton>
                    </FlexBox>
                    <Typography>
                      {item?.attributes?.shortDescription}
                    </Typography>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        >
                          <Remove />
                        </IconButton>
                        <Typography>
                          <IconButton
                            onClick={() =>
                              dispatch(increaseCount({ id: item.id }))
                            }
                          >
                            <Add />
                          </IconButton>
                        </Typography>
                      </Box>
                      {/*price*/}
                      <Typography fontWeight="bold">
                        {item?.attributes?.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>
          {/*actions*/}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBox>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                margin: "20px 0",
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen());
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
