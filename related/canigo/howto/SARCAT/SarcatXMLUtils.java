package cat.gencat.ctti.canigo.arch.integration.sarcat.pica.utils;

import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;

import javax.xml.XMLConstants;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.jibx.runtime.BindingDirectory;
import org.jibx.runtime.IBindingFactory;
import org.jibx.runtime.IMarshallingContext;
import org.jibx.runtime.IUnmarshallingContext;
import org.jibx.runtime.JiBXException;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import cat.gencat.ctti.canigo.arch.integration.sarcat.pica.exceptions.SarcatException;

/**
 * The type Pica xml utils.
 *
 * @author cscanigo
 */
public class SarcatXMLUtils {

  private SarcatXMLUtils() {
    throw new IllegalStateException("SarcatXMLUtils class");
  }
  
  	/**
	 * Mètode que transforma un objecte java a XML a partir d'un fitxer de binding.
	 * @param writer Writer --> Aquí és on pintarà l'xml.
	 * @param objecte Object --> Objecte a transformar a XML.
	 * @throws SarcatException
	 */
	public static void objectToXML(Writer writer, Object objecte) throws SarcatException {
		try {
			IBindingFactory bfact = BindingDirectory.getFactory(objecte.getClass());
			IMarshallingContext mctx = bfact.createMarshallingContext();
			//Se indica la sangría con la que se representarán los datos en el xml
			mctx.setIndent(2);

			mctx.setOutput(writer);
			mctx.marshalDocument(objecte);

		} catch (JiBXException e1) {
			throw new SarcatException(SarcatXMLUtils.class.getName(), "objectToXML", e1.getMessage(), e1);
		}
	}

	/**
	 * Mètode que transforma un XML a objecte java a partir d'un fitxer de binding.
	 * @param objecte Object --> Tipus d'objecte a crear a partir de l'XML.
	 * @param xml String --> XML a parsejar.
	 * @return Object --> Objecte creat a partir de l'xml.
	 * @throws SarcatException
	 */
	public static Object xmlToObject(Object objecte, String xml) throws SarcatException {
		try {
			IBindingFactory bfact = BindingDirectory.getFactory(objecte.getClass());
			IUnmarshallingContext uctx = bfact.createUnmarshallingContext();

			//Se indica la sangría con la que se representarán los datos en el xml
			objecte = uctx.unmarshalDocument(new StringReader(xml));

			return objecte;

		} catch (JiBXException e1) {
			throw new SarcatException(SarcatXMLUtils.class.getName(), "xmlToObject", e1.getMessage(), e1);
		}
	}


  /**
   * Mètode que transforma un objecte Node a XML.
   *
   * @param node Node --> Node a transformar.
   * @return String --> xml.
   * @throws SarcatException the pica integration exception
   */
  public static String nodeToString(Node node) throws SarcatException {
    StringWriter sw = new StringWriter();
    try {
      TransformerFactory factory = TransformerFactory.newInstance();
      factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);

      Transformer t = factory.newTransformer();
      t.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
      t.transform(new DOMSource(node), new StreamResult(sw));
    } catch (TransformerFactoryConfigurationError | TransformerException e) {
      throw new SarcatException(SarcatXMLUtils.class.getName(), "nodeToString", e.getMessage(), e);
    }
    return sw.toString();
  }

  /**
   * Mètode que busca el node dessitjat dintre d'un node pare.
   *
   * @param nodeInicial Node --> Node pare, que conté el node que volem buscar.
   * @param nodeBuscar  String --> Nom del node a buscar.
   * @return Node --> Node a buscar.
   */
  public static Node findNode(Node nodeInicial, String nodeBuscar) {
    if (nodeInicial != null && nodeInicial.getNodeName() != null && nodeInicial.getNodeName().contains(nodeBuscar)) {
      return nodeInicial;
    } else if (nodeInicial != null && nodeInicial.getChildNodes() != null) {
      NodeList llistaNodes = nodeInicial.getChildNodes();
      for (int i = 0; i < llistaNodes.getLength(); i++) {
        Node node = findNode(llistaNodes.item(i), nodeBuscar);
        if (node != null) {
          return node;
        }
      }
    }
    return null;
  }
}
