export default function MesssageNotification(){
    const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return(

        <Box>
              <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Xác nhận xóa category"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn có chắc chắn muốn xóa category này?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleConfirmDelete}>Có</Button>
              <Button onClick={handleClose} autoFocus>
                Không
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
    );
}