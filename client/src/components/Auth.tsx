import { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { trAdd, tr } from 'common/helpers/tr';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import useLocation from 'react-use/lib/useLocation';
import HistoryLink from './RouterLink';
import { authSignIn, authSignUp, authPasswordReset, authRefreshToken } from '~src/api/auth';
import styled from '@mui/material/styles/styled';
import app from '~src/app';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import router from '~src/helpers/router';

const Container = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#EEEEEE',
  position: 'relative',
});

trAdd('fr', {
  'Error: invalid-email-password': 'Email ou mot de passe invalide',
  'Error: email-already-in-use': 'Email déjà utilisé',
  'Error: invalid-ticket': 'Le ticket de réinitialisation du mot de passe a expiré',
  'AbortError: Aborted': 'Demande annulée pour des raisons de sécurité, veuillez réessayer dans 5 minutes.',
  'sign-in-submit': 'JE ME CONNECTE',
  'sign-up-submit': 'JE M’INSCRIS',
  'password-reset-submit': 'ENVOYER UN MAIL DE RÉINITIALISATION',
  'password-reset': 'Mot de passe oublié ?',
});

export type AuthStage = 'sign-up' | 'sign-in' | 'password-reset';

const stageMap: Record<AuthStage, boolean> = {
  'sign-up': true,
  'sign-in': true,
  'password-reset': true,
};

const loadParams = router.current.params;

export default function Auth() {
  const location = useLocation();
  const locationMatch = location.pathname && location.pathname.match(/\/auth\/([^\/]+)/);
  const locationStage = String((locationMatch || [])[1] || '') as AuthStage;
  const stage: AuthStage = locationStage in stageMap ? locationStage : 'sign-in';
  const isSignIn = stage === 'sign-in';
  const isSignUp = stage === 'sign-up';
  const isPasswordReset = stage === 'password-reset';
  const hasPasswordField = isSignIn || isSignUp;

  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email(tr('Doit être un email valide')).max(255).required(tr('L’email est requis')),
    ...(hasPasswordField
      ? {
          password: Yup.string().max(255).required(tr('Le mot de passe est requis')),
        }
      : {}),
  });

  return (
    <Container>
      <Card
        variant="outlined"
        sx={{
          minWidth: '320px',
          boxShadow: 3,
          form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'strech',
            p: 3,
          },
          '.MuiTextField-root': {  m: 1 }
        }}
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
            submit: null,
          }}
          validationSchema={validationSchema}
          onReset={async () => {
            console.debug('Login onReset', stage);
          }}
          onSubmit={async ({ email, password }, { setErrors, setStatus, setSubmitting }) => {
            console.debug('Login onSubmit', stage, { email, password, setErrors, setStatus, setSubmitting });
            try {
              if (isPasswordReset) {
                await authPasswordReset(email, app.appUrl + '/admin/auth');
                setStatus({ success: true, message: 'Vérifier votre adresse mail (ou spam)' });
                return;
              }

              if (isSignIn) {
                await authSignIn(email, password);
                setStatus({ success: true });
                return;
              }

              if (isSignUp) {
                await authSignUp(email, password);
                setStatus({ success: true });
                return;
              }

              throw new Error('not implemented');
            } catch (err: any) {
              console.error('Login onSubmit', stage, err);
              setStatus({ success: false });
              if (err.message === 'email-already-in-use') setErrors({ email: tr(err) });
              else if (err.message === 'invalid-email-password') setErrors({ password: tr(err) });
              else setErrors({ submit: tr(err) });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, status, setErrors }) => {
            if (loadParams.refreshToken) {
              authRefreshToken(String(loadParams.refreshToken)).finally(() => router.push('/admin'));
              delete loadParams.refreshToken;
            }

            if (loadParams.error) {
              setErrors({ submit: tr('Error: ' + loadParams.error) });
              delete loadParams.error;
            }

            const error = errors.email || errors.password || errors.submit;

            console.debug('Auth form', { errors, isSubmitting, touched, values, status, error });

            return (
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label={tr('Adresse Email :')}
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!(touched.email && errors.email)}
                />
                {hasPasswordField && (
                  <TextField
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    label={tr('Mot de passe :')}
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!(touched.password && errors.password)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                {error && <Box sx={{ mt: 1, color: 'red' }}>{error}</Box>}
                {status?.message && (
                  <Box sx={{ mt: 1 }} color="success">
                    {status.message}
                  </Box>
                )}
                {isSignIn && (
                  <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(event) => setChecked(event.target.checked)}
                          name="checked"
                          color="primary"
                        />
                      }
                      label={tr('Se souvenir de moi')}
                    />
                    <HistoryLink to={'/admin/auth/password-reset'}>{tr('password-reset')}</HistoryLink>
                  </Box>
                )}
                <Button variant="contained" sx={{ mt: 1, width: '100%' }} disabled={isSubmitting} type="submit">
                  {tr(stage + '-submit')}
                </Button>
                <HistoryLink
                  sx={{ mt: 1, width: '100%', textAlign: 'center' }}
                  to={isSignIn ? '/admin/auth/sign-up' : '/admin/auth'}
                >
                  {isSignIn ? tr('Vous n’êtes pas inscrit ?') : tr('Revenir à l’écran de Connexion')}
                </HistoryLink>
              </form>
            );
          }}
        </Formik>
      </Card>
      <Link sx={{ position: 'absolute', top: 0, left: 0, height: 40, width: 40 }} href="/device" />
      <Link sx={{ position: 'absolute', bottom: 0, left: 0, height: 40, width: 40 }} href="/device" />
      <Link sx={{ position: 'absolute', top: 0, right: 0, height: 40, width: 40 }} href="/device" />
      <Link sx={{ position: 'absolute', m: 1, mr: 3, p: 1, bottom: 0, right: 0 }} href={app.host}>
        © {app.name} 2022
      </Link>
    </Container>
  );
}
