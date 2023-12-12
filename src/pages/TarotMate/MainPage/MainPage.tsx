import Link from "@mui/material/Link";
import {Typography} from "@mui/material";
import Button from "../../../components/atoms/Button";


function MainPage() {
    return (
            <div>
                <Typography variant="body2" color="text.secondary" align="center">
                <Link color="inherit" href="/tarot">
                tarotmate
                </Link>
                    <Button text={"1번 버튼"} color={"red"} />
                    <Button text={"2번 버튼"} color={"blue"} />
                    <Button text={"3번 버튼"} />
                </Typography>
            </div>
    )
}

export default MainPage;