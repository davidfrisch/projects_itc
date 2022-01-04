import { Button, Container, FormControl, MenuItem, Select } from "@mui/material";
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ROLE } from '../../../../constants/roles'
import { updateUserByIdAdmin } from '../../../../actions/user'
import useStyles from './style'

const UserFormForAdmin = ({ user }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [role, setRole] = useState(+user.role)
    const { currentUserAuth } = useSelector(state => state.userStatus)

    const handleSaveRole = (e) => {
        e.preventDefault()
        const newUser = { ...user, role }
        dispatch(updateUserByIdAdmin(user._id, newUser))
    }

    return (
        <Container>
            <form className={classes.formRole} type="submit" onSubmit={handleSaveRole}>
                <FormControl style={{ width: 100 }}>
                    {user._id !== currentUserAuth._id && <Button disabled={user.role === role} type='sumbit' variant="contained">Save</Button>}
                    <Select
                        value={role}
                        disabled={user._id === currentUserAuth._id}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value={ROLE.USER}>User</MenuItem>
                        <MenuItem value={ROLE.ADMIN}>Admin</MenuItem>
                    </Select>
                </FormControl>
            </form>
        </Container>
    );
}

export default UserFormForAdmin;