
import { Drawer, IconButton, List, Link } from "@material-ui/core";
import { Instagram as InstagramIcon, Facebook as FacebookIcon, GitHub as GithubIcon } from '@material-ui/icons';

export const bgColor = 'linear-gradient(to right, #141e30 , #243b55)';
export const bgTextColor = 'white';
export const bgIconColor = '#141e30';

export const socialIcons = () => {
    return (
        <>
            <Link
                href={'https://www.facebook.com/madhubabu.g.92'}
                target={'_blank'}
            >
                <IconButton aria-label="facebook" style={{ backgroundColor: '#141e30', margin: 10 }}>
                    <FacebookIcon style={{ color: 'white' }} />
                </IconButton>
            </Link>
            <Link
                href={'https://www.instagram.com/mb_naidu/'}
                target={'_blank'}
            >
                <IconButton aria-label="instagram" style={{ backgroundColor: '#141e30', margin: 10 }} >
                    <InstagramIcon style={{ color: 'white' }} />
                </IconButton>
            </Link>
            <Link
                href={'https://github.com/mbnaidu'}
                target={'_blank'}
            >
                <IconButton aria-label="github" style={{ backgroundColor: '#141e30', margin: 10 }}>
                    <GithubIcon style={{ color: 'white' }}
                    />
                </IconButton>
            </Link>
        </>
    )
}