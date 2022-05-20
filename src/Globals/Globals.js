
import { IconButton, Link } from "@material-ui/core";
import { Instagram as InstagramIcon, Facebook as FacebookIcon, GitHub as GithubIcon } from '@material-ui/icons';
import './global.css'

export const bgColor = 'linear-gradient(to right, #141e30 , #243b55)';
export const bgTextColor = 'white';
export const bgIconColor = '#141e30';

export const socialIcons = props => {
    return (
        <>
            <Link
                href={'https://www.facebook.com/madhubabu.g.92'}
                target={'_blank'}
            >
                <IconButton aria-label="facebook" style={{ backgroundColor: '#141e30', margin: 10 }}>
                    <FacebookIcon className={props ? 'fbicon' : ''} style={{ color: 'white', fontSize: 28 }} />
                </IconButton>
            </Link>
            <Link
                href={'https://www.instagram.com/mb_naidu/'}
                target={'_blank'}
            >
                <IconButton aria-label="instagram" style={{ backgroundColor: '#141e30', margin: 10 }} >
                    <InstagramIcon className={props ? 'instaicon' : ''} style={{ color: 'white' }} />
                </IconButton>
            </Link>
            <Link
                href={'https://github.com/mbnaidu'}
                target={'_blank'}
            >
                <IconButton aria-label="github" style={{ backgroundColor: '#141e30', margin: 10 }}>
                    <GithubIcon className={props ? 'githubicon' : ''} style={{ color: 'white' }}
                    />
                </IconButton>
            </Link>
        </>
    )
};

export const movingText = props => {
    return (
        <div className="userNameParent">
            <div className="userNameChild">{props}</div>
        </div>
    )
}