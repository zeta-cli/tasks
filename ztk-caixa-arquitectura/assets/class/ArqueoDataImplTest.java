package es.lacaixa.absis.ssmm.arq.http.controller.arqueo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import es.lacaixa.absis.arch20.core.profile.ProfileTO;
import es.lacaixa.absis.ssmm.arqueo.ProfileArqueoAPI;
import es.lacaixa.absis.ssmm.arqueo.to.ArqueoTO;

public class ArqueoDataImplTest {

	private ArqueoDataImpl arqueoDataImpl;
	private ProfileArqueoAPI profileArqueo;
	private ProfileTO profile;
	private List<ArqueoTO> listArqueo;

	private final String valueArqueoPattern = "^([a-zA-Z0-9,]+=[a-zA-Z0-9,]+;)+([a-zA-Z0-9,]+=[a-zA-Z0-9,]+)$";

	@Before
	public void setUp() {
		profileArqueo = Mockito.mock(ProfileArqueoAPI.class);

		listArqueo = new ArrayList<ArqueoTO>();
		ArqueoTO arqueo = new ArqueoTO();
		arqueo.setAplicacion("test");
		arqueo.setDivisa("EUR");
		arqueo.setImporteCobro("12,12");
		arqueo.setTipoOperacion("prueba");
		listArqueo.add(arqueo);
		ArqueoTO arqueo2 = new ArqueoTO();
		arqueo2.setAplicacion("test2");
		arqueo2.setDivisa("DOL");
		arqueo2.setImporteCobro("0,50");
		arqueo2.setTipoOperacion("prueba2");
		listArqueo.add(arqueo2);

		arqueoDataImpl = new ArqueoDataImpl();
		arqueoDataImpl.setArqueoApi(profileArqueo);

		profile = new ProfileTO();
		profile.getRequestData().put("service_method", "SN.MCA.CONTRATO.ALTA");
	}

	/**
	 * @Historia (F-001)
	 * @Criterio (1)
	 * @Caso_de_prueba (Si el profile es nulo se debe devolver un NullPointerException)
	 * @Descripcion (Se verifica que si el profile es nulo se debe devolver un NullPointerException.)
	 * @Estado (Error)
	 */
	@Test(expected = NullPointerException.class)
	public void error_si_profile_nulo() {
		Mockito.when(profileArqueo.getInfo()).thenReturn(listArqueo);
		arqueoDataImpl.getArqueoHeaders(null);
	}

	/**
	 * @Historia (F-002)
	 * @Criterio (1)
	 * @Caso_de_prueba (Si el profile contiene un mapa pero este está vacío, no se pasará ningún dato a las cabeceras)
	 * @Descripcion (Se verifica que Si el profile contiene un mapa pero este está vacío, no se pasará ningún dato a las cabeceras.)
	 * @Estado (Ok)
	 */
	@Test
	public void mapa_vacio_si_no_elementos_arqueo() {
		Mockito.when(profileArqueo.getInfo()).thenReturn(new ArrayList<ArqueoTO>());
		arqueoDataImpl.getArqueoHeaders(profile);
		assertEquals(0, arqueoDataImpl.getArqueoHeaders(profile).size());
	}

	/**
	 * @Historia (F-002)
	 * @Criterio (1)
	 * @Caso_de_prueba (Si el profile contiene un mapa con un único elemento, la cabecera contra ese único valor)
	 * @Descripcion (Se verifica que si el profile contiene un mapa con un único elemento, la cabecera contra ese único valor.)
	 * @Estado (Ok)
	 */
	@Test
	public void mapa_correctamente_formado_con_un_valor_en_lista_arqueo() {
		Mockito.when(profileArqueo.getInfo()).thenReturn(listArqueo.subList(0, 1));
		Map<String, String> arqueoHeaders = arqueoDataImpl.getArqueoHeaders(profile);
		assertEquals(1, arqueoHeaders.size());
		assertTrue(arqueoHeaders.entrySet().iterator().next().getKey().startsWith("Arqueo-"));
		assertTrue(arqueoHeaders.entrySet().iterator().next().getValue().matches(valueArqueoPattern));
	}

	/**
	 * @Historia (F-002)
	 * @Criterio (1)
	 * @Caso_de_prueba (Si el profile contiene un mapa con varios elementos la cabecera contendrá todos los valores)
	 * @Descripcion (Se verifica que si el profile contiene un mapa con varios elementos, la cabecera contendrá todos los valores.)
	 * @Estado (Ok)
	 */
	@Test
	public void mapa_correctamente_formado_con_varios_valores_en_lista_arqueo() {
		Mockito.when(profileArqueo.getInfo()).thenReturn(listArqueo);
		Map<String, String> arqueoHeaders = arqueoDataImpl.getArqueoHeaders(profile);
		assertEquals(listArqueo.size(), arqueoHeaders.size());

		for (Entry<String, String> cabeceras : arqueoHeaders.entrySet()) {
			assertTrue(cabeceras.getKey().startsWith("Arqueo-"));
			assertTrue(cabeceras.getValue().matches(valueArqueoPattern));
		}

	}
}
