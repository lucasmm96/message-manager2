import classes from '@/components/layout/Footer.module.css';

function Footer() {
  return (
    <footer className={classes.footer}>
      Message Manager © 2023 by{' '}
      <a href="https://github.com/lucasmm96" target="_blank">
        lucasmm96
      </a>
    </footer>
  );
}

export default Footer;
