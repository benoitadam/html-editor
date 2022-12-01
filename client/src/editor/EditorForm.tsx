import { defaultN, propLangMap, setLang } from 'common/box';
import useB from '~src/hooks/useB';
import isAdvanced$ from './isAdvanced$';
import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { translateBox, translateChildren } from '../api/translate';
import useMessager from '~src/hooks/useMessager';
import UploadButton from './UploadButton';
import Category, { BContext } from './Category';
import Field from './Field';
import FieldTr from './FieldTr';
import app from '~src/app';

const Row = ({ children, show }: PropsWithChildren<{ show?: boolean }>) => {
  if (show === false) return null;
  return <Box className="editor_form_row">{children}</Box>;
};

export default ({ id }: { id: string }) => {
  const isAdvanced = useMessager(isAdvanced$);
  const b = useB(id);

  console.debug('BoxForm', id, b.n);

  const n = b.n || defaultN;
  const t = n.t || '';

  return (
    <BContext.Provider value={b}>
      <Box
        key={id}
        className="editor_form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          pb: 0.5,
          overflow: 'hidden',
          overflowY: 'auto',
          '.editor_form_row': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }
        }}
      >
        <Row>
          <Field p="t" />
          <Field p="label" />
        </Row>
        <Field p="lang" show={t === 'lang'} />
        <Field p="siteTitle" show={!n.pId} />
        <Field p="homePage" show={!n.pId} />

        <Field p="ctn" show={(b.n.childIds||[]).length === 0 && (!!b.n.ctn || t === 'ctn')} />
        
        <Category k="page" title="Page" show={t === 'page'}>
          <Field p="page" />
        </Category>
        <Category k="img" title="Image" show={t === 'img'}>
          <Field p="alt" />
          <Row>
            <Field p="img" />
            <UploadButton p="img" />
          </Row>
        </Category>
        <Category k="video" title="Vidéo" show={t === 'video'}>
          <Field p="video" />
          <Row>
            <Button>Transcode</Button>
            <Field p="vp8HD" />
            <Field p="vp8SD" />
            <Field p="mp4HD" />
            <Field p="mp4SD" />
          </Row>
        </Category>
        <Category k="carousel" title="Carrousel" show={t === 'carousel'}>
          <Field p="duration" />
          <Field p="anim" />
        </Category>
        <Category k="template" title="Modèle" show={t === 'template'}>
          <Row>
            <Field p="template" />
            <Field p="icon" />
          </Row>
          <Field p="props" />
          <Field p="vars" />
        </Category>
        <Category k="header" title="Entête" show={t === 'header'}>
          <Field p="title" />
          <Field p="desc" />
        </Category>
        <Category k="product" title="Produit" show={t === 'product'}>
          <Row>
            <Field p="del" />
            <Field p="out" />
          </Row>
          <Row>
            <Field p="vgn" />
            <Field p="veg" />
            <Field p="bio" />
            <Field p="aoc" />
          </Row>
          <Field p="title" />
          <Field p="info" />
          <Field p="info2" />
          <Row>
            <Field p="price" />
            <Field p="price2" />
            <Field p="price3" />
          </Row>
          <Field p="desc" />
        </Category>
        <Category k="translate" title="Traduction">
          <Row>
            {Object.keys(propLangMap).map(lang => (
              <IconButton sx={{ '& img': { width: 40, height: 40 } }} onClick={() => setLang(lang)}>
                <img src={`${app.host}/files/flags/${lang}.svg`} />
              </IconButton>
            ))}
          </Row>
          {Object.keys(b.t).map(k => <FieldTr key={k} p={k} />)}
          <Row>
            <Button startIcon={<TranslateIcon />} onClick={() => translateBox(b.id)}>Traduction automatique</Button>
            {isAdvanced && (
              <Button startIcon={<TranslateIcon />} onClick={() => translateChildren(b.id)}>Enfants</Button>
            )}
          </Row>
        </Category>
        <Category k="base" title="Base" show={isAdvanced}>
          <Field p="id" />
          <Field p="cls" />
          <Field p="css" />
          <Field p="style" />
          <Field p="attrs" />
        </Category>
        <Category k="display" title="Affichage" show={isAdvanced}>
          <Field p="alignSelf" />
          <Field p="display" />
          <Field p="overflow" />
          <Field p="visibility" />
          <Field p="zIndex" />
        </Category>
        <Category k="flexbox" title="Flexbox" show={n.display === 'flex' || n.display === 'inline-flex'}>
          <Field p="flexDirection" />
          <Row>
            <Field p="alignItems" />
            <Field p="justifyContent" />
          </Row>
          <Row>
            <Field p="alignContent" />
            <Field p="flexWrap" />
            <Field p="order" />
          </Row>
          <Row>
            <Field p="flex" />
            <Field p="flexShrink" />
            <Field p="flexBasis" />
          </Row>
        </Category>
        <Category k="borders" title="Bordures" show={isAdvanced}>
          <Row>
            <Field p="b" />
            <Field p="bt" />
            <Field p="bb" />
            <Field p="bl" />
            <Field p="br" />
          </Row>
          <Row>
            <Field p="bc" />
            <Field p="btc" />
            <Field p="bbc" />
            <Field p="blc" />
            <Field p="brc" />
          </Row>
          <Field p="shadow" show={isAdvanced} />
        </Category>
        <Category k="text" title="Texte">
          <Field p="color" />
          <Row>
            <Field p="fontSize" />
            <Field p="fontWeight" />
          </Row>
          <Field p="textAlign" />
          <Field p="fontImport" show={isAdvanced} />
          <Field p="fontTitleFamily" show={isAdvanced} />
          <Row show={isAdvanced}>
            <Field p="whiteSpace" />
            <Field p="textOverflow" />
          </Row>
          <Field p="fontFamily" show={isAdvanced} />
          <Field p="fontStyle" show={isAdvanced} />
          <Row show={isAdvanced}>
            <Field p="textTransform" />
            <Field p="letterSpacing" />
            <Field p="lineHeight" />
          </Row>
        </Category>
        <Category k="spacing" title="Position">
          <Field p="position" show={isAdvanced} />
          <Row>
            <Field p="x" />
            <Field p="y" />
            <Field p="w" />
            <Field p="h" />
          </Row>
          <Row>
            <Field p="wMin" show={isAdvanced} />
            <Field p="wMax" show={isAdvanced} />
          </Row>
          <Row>
            <Field p="hMin" show={isAdvanced} />
            <Field p="hMax" show={isAdvanced} />
          </Row>
          <Row>
            <Field p="m" show={isAdvanced} />
            <Field p="mt" show={isAdvanced} />
            <Field p="mr" show={isAdvanced} />
            <Field p="mb" show={isAdvanced} />
            <Field p="ml" show={isAdvanced} />
          </Row>
          <Row>
            <Field p="p" show={isAdvanced} />
            <Field p="pt" show={isAdvanced} />
            <Field p="pr" show={isAdvanced} />
            <Field p="pb" show={isAdvanced} />
            <Field p="pl" show={isAdvanced} />
          </Row>
        </Category>
        <Category k="background" title="Background">
          <Field p="bgColor" />
          <Row>
            <Field p="bgImg" />
            <UploadButton p="bgImg" />
          </Row>
          <Row>
            <Field p="bgPos" show={isAdvanced} />
            <Field p="bgPosX" show={isAdvanced} />
            <Field p="bgPosY" show={isAdvanced} />
          </Row>
          <Row show={isAdvanced}>
            <Field p="bgRepeat" />
            <Field p="bgSize" />
          </Row>
        </Category>
        <Category k="events" title="Events" show={isAdvanced}>
          <Field p="onClick" />
          <Field p="onStart" />
          <Field p="onEnd" />
        </Category>
      </Box>
    </BContext.Provider>
  );
};