package cat.gencat.ctti.canigo.arch.integration.sarcat.pica.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.xmlbeans.XmlException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.w3c.dom.Node;

import cat.gencat.ctti.canigo.arch.integration.pica.IPicaServiceWrapper;
import cat.gencat.ctti.canigo.arch.integration.sarcat.pica.SarcatConnector;
import cat.gencat.ctti.canigo.arch.integration.sarcat.pica.exceptions.SarcatException;
import cat.gencat.ctti.canigo.arch.integration.sarcat.pica.impl.SarcatConnectorImpl;
import cat.gencat.ctti.canigo.arch.integration.sarcat.pica.utils.SarcatXMLUtils;
import cat.gencat.pica.peticio.core.IPICAServiceSincron;
import cat.gencat.pica.peticio.core.beans.DadesEspecifiques;
import cat.gencat.pica.peticio.core.beans.Funcionari;
import cat.gencat.pica.peticio.core.exception.PICAException;
import net.gencat.pica.mp.ws.CridaSincronaResponseDocument;
import net.gencat.scsp.esquemes.peticion.alta.SarcatAlAltaRequestDocument;
import net.gencat.scsp.esquemes.peticion.alta.SarcatAlAltaResponseDocument;
import net.gencat.scsp.esquemes.peticion.common.DadesSessio;
import net.gencat.scsp.esquemes.peticion.common.DadesSessio.Factory;

@Service
@Qualifier("sarcatConnectorCustom")
public class SarcatConnectorCustomImpl extends SarcatConnectorImpl implements SarcatConnector {
	private static final Log log = LogFactory.getLog(SarcatConnectorCustomImpl2.class);
	private IPicaServiceWrapper picaService;
	private Funcionari funcionari;
	private String usuari;
	private String password;

	@Override
	public SarcatAlAltaResponseDocument insertarAssentamentSafata(SarcatAlAltaRequestDocument document)
			throws SarcatException {
		this.log("[insertarAssentamentSafata] - Inici", 1);
		long t1 = System.currentTimeMillis();
		document.getSarcatAlAltaRequest().setDadesSessio(this.getDadesSessio("OP_INSERTAR_ASSENTAMENTS_SAFATA"));
		SarcatAlAltaResponseDocument resposta = this.sarcatAlAlta(document);
		this.log("[insertarAssentamentSafata] - Fi (" + (System.currentTimeMillis() - t1) + "ms)", 1);
		return resposta;
	}

	private SarcatAlAltaResponseDocument sarcatAlAlta(SarcatAlAltaRequestDocument document) throws SarcatException {
		IPICAServiceSincron servei = this.picaService.getPicaWebServiceSincronInstance("SARCAT_AL_ALTA");
		servei.setDadesEspecifiques(this.crearDadesEspecifiques("SOL_01", document));
		CridaSincronaResponseDocument resposta = this.realitzarPeticio(servei);
		Node nodeResposta = SarcatXMLUtils.findNode(resposta.getDomNode(), ":SarcatAlAltaResponse");
		SarcatAlAltaResponseDocument respostaAlta = null;

		try {
			respostaAlta = net.gencat.scsp.esquemes.peticion.alta.SarcatAlAltaResponseDocument.Factory
					.parse(nodeResposta);
			return respostaAlta;
		} catch (XmlException var7) {
			throw new SarcatException(this.getClass().toString(), "sarcatAlAlta",
					"Error al parsejar l'objecte de resposta", var7);
		}
	}

	private List<DadesEspecifiques> crearDadesEspecifiques(String idSolicitud, Object xmlObject)
			throws SarcatException {
		this.log("[crearDadesEspecifiques] - Inici (" + idSolicitud + ")", 1);
		List<DadesEspecifiques> dadesEspecifiques = new ArrayList<DadesEspecifiques>();
		DadesEspecifiques dades = new DadesEspecifiques();
		dades.setIdSolicitud(idSolicitud);
		dades.setDadesXML(xmlObject.toString());
		dadesEspecifiques.add(dades);
		this.log("[crearDadesEspecifiques] - Fi (" + dades.getDadesXML() + ")", 1);
		return dadesEspecifiques;
	}

	private CridaSincronaResponseDocument realitzarPeticio(IPICAServiceSincron servei) throws SarcatException {
		servei.setFuncionari(this.funcionari);

		try {
			servei.crearPeticio("connector_Sarcat_realitzarPeticio_" + System.currentTimeMillis());
		} catch (PICAException var3) {
			throw new SarcatException(this.getClass().toString(), "realitzarPeticio", var3.getMessage(), var3);
		}

		CridaSincronaResponseDocument resposta = this.picaService.ferPeticioAlServei(servei);
		this.log("[realitzarPeticio] - Resposta: " + resposta, 1);
		return resposta;
	}

	private DadesSessio getDadesSessio(String idMetodo) {
		DadesSessio dadesSessio = Factory.newInstance();
		dadesSessio.setIdMetodo(idMetodo);
		dadesSessio.setUsuari(this.usuari);
		dadesSessio.setPassword(this.password);
		return dadesSessio;
	}
	
	private void log(String cadena, int nivell) {
		switch (nivell) {
		case 1:
			if (log.isDebugEnabled()) {
				log.debug(cadena);
			}
			break;
		case 2:
			if (log.isInfoEnabled()) {
				log.info(cadena);
			}
			break;
		case 3:
			if (log.isErrorEnabled()) {
				log.error(cadena);
			}
			break;
		default:
			if (log.isInfoEnabled()) {
				log.info(cadena);
			}
		}

	}
}
