import Link from "@mui/material/Link";
import {Typography} from "@mui/material";
import Button from "../../components/atoms/Button";


function MainPage() {
    const buttonProps:any = {
        text: "1번버튼",
        color: "red",
        a: 1,
        b:2,
        c:3,
    };
    return (
            <div>
                <Typography variant="body2" color="text.secondary" align="center">
                <Link color="inherit" href="/tarot">
                tarotmate
                </Link>
                    <Button {...buttonProps}>
                        <div>버튼</div>
                    </Button>
                    <Button text={"2번 버튼"} color={"blue"} />
                    <Button text={"3번 버튼"} />
                </Typography>
            </div>
    )
}

export default MainPage;