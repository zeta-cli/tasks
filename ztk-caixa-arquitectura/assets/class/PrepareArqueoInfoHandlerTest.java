package es.lacaixa.absis.ssmm.arq.http.controller.chain.handler;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import es.lacaixa.absis.arch20.core.profile.ProfileTO;
import es.lacaixa.absis.arch20.core.profile.internal.RequestData;
import es.lacaixa.absis.ssmm.arq.http.configuration.resolver.ArqueoResolver;
import es.lacaixa.absis.ssmm.arq.http.controller.arqueo.IArqueoData;
import es.lacaixa.absis.ssmm.arq.http.controller.chain.to.AbsisBackendPostChainContext;
import es.lacaixa.absis.ssmm.arq.http.controller.chain.to.AbsisChainContext;

public class PrepareArqueoInfoHandlerTest {
	@Mock
	private ArqueoResolver arqResolver;
	@Mock
	private IArqueoData arqueo;
	@Mock
	private ProfileTO profile;
	@Mock
	private HttpServletRequest request;
	@Mock
	private HttpServletResponse response;

	private PrepareArqueoInfoHandler handler;
	private AbsisChainContext preContext;

	private static final String FULL_SN_FROM_PROFILE = "SN.MCA.Contrato.alta";

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);

		handler = new PrepareArqueoInfoHandler(arqResolver, arqueo);

		preContext = new AbsisBackendPostChainContext(profile, new Object(), request, response);
		RequestData rd = new RequestData();
		rd.put("service_method", FULL_SN_FROM_PROFILE);
		Mockito.when(profile.getRequestData()).thenReturn(rd);
		Mockito.when(arqResolver.getSnName(FULL_SN_FROM_PROFILE)).thenReturn("SN.MCA.Contrato");
		Mockito.when(arqResolver.getSnMethod(FULL_SN_FROM_PROFILE)).thenReturn("alta");

	}

	/**
	 * @Historia (F-002)
	 * @Criterio (1)
	 * @Caso_de_prueba (Si el profile viene nulo no se ejecuta el seteo de cabeceras)
	 * @Descripcion (Se verifica que si el profile viene nulo las cabeceras no serán ejecutadas)
	 * @Estado (Ok)
	 */
	@Test
	public void si_profile_nulo_no_ejecuta_seteo_cabeceras() {
		handler.execute(new AbsisBackendPostChainContext(null, new Object(), request, response));
		Mockito.verify(arqueo, Mockito.times(0)).getArqueoHeaders(profile);
	}

	/**
	 * @Historia (F-002)
	 * @Criterio (1)
	 * @Caso_de_prueba (Si el SN no es arqueable no se ejecuta el seteo de cabeceras)
	 * @Descripcion (Se verifica que si el SN no es arqueable el seteo de cabeceras no se ejecuta.)
	 * @Estado (Ok)
	 */
	@Test
	public void si_sn_no_arqueable_no_se_ejecuta_seteo_cabeceras() {
		Mockito.when(arqResolver.isSNArqueable(arqResolver.getSnName(FULL_SN_FROM_PROFILE),
				arqResolver.getSnMethod(FULL_SN_FROM_PROFILE))).thenReturn(false);
		handler.execute(preContext);
		Mockito.verify(arqueo, Mockito.times(0)).getArqueoHeaders(profile);
	}

	/**
	 * @Historia (F-002)
	 * @Criterio (1)
	 * @Caso_de_prueba (Si el canal no tiene permitido ejecutar el seteo de cabeceras)
	 * @Descripcion (Se verifica que si el canal no está permitido el seteo de cabeceras)
	 * @Estado (Ok)
	 */
	@Test
	public void si_canal_no_permitido_no_ejecuta_seteo_cabeceras() {
		Mockito.when(arqResolver.isSNArqueable(arqResolver.getSnName(FULL_SN_FROM_PROFILE),
				arqResolver.getSnMethod(FULL_SN_FROM_PROFILE))).thenReturn(true);
		Mockito.when(arqResolver.isCanalAllowed()).thenReturn(false);
		handler.execute(preContext);
		Mockito.verify(arqueo, Mockito.times(0)).getArqueoHeaders(profile);
	}

	/**
	 * @Historia (F-002)
	 * @Criterio (1)
	 * @Caso_de_prueba (Si el SN es arqueable pero no tiene datos de arqueo, no se ejecuta el seteo de cabeceras)
	 * @Descripcion (Se verifica que si el SN es arqueable y no tiene datos, el seteo de cabeceras no se ejecuta.)
	 * @Estado (Ok)
	 */
	@Test
	public void si_no_existen_cabeceras_arqueo_no_ejecuta_seteo_cabeceras() {
		Mockito.when(arqResolver.isSNArqueable(arqResolver.getSnName(FULL_SN_FROM_PROFILE),
				arqResolver.getSnMethod(FULL_SN_FROM_PROFILE))).thenReturn(true);
		Mockito.when(arqResolver.isCanalAllowed()).thenReturn(true);
		Mockito.when(arqueo.getArqueoHeaders(profile)).thenReturn(new HashMap<String, String>());
		handler.execute(preContext);
		Mockito.verify(response, Mockito.times(0)).setHeader(Mockito.anyString(), Mockito.anyString());
	}

	/**
	 * @Historia (F-002)
	 * @Criterio (1)
	 * @Caso_de_prueba (Si el SN es arqueable y tiene un dato de arqueo, se ejecuta el seteo de cabeceras)
	 * @Descripcion (Se verifica que si el SN es arqueable y tiene datos, el seteo de cabeceras se ejecuta.)
	 * @Estado (Ok)
	 */
	@Test
	public void si_existe_una_cabecera_arqueo_ejecuta_seteo_cabeceras() {
		Mockito.when(arqResolver.isSNArqueable(arqResolver.getSnName(FULL_SN_FROM_PROFILE),
				arqResolver.getSnMethod(FULL_SN_FROM_PROFILE))).thenReturn(true);
		Mockito.when(arqResolver.isCanalAllowed()).thenReturn(true);
		HashMap<String, String> mapCabeceras = new HashMap<String, String>();
		mapCabeceras.put("Arqueo-" + FULL_SN_FROM_PROFILE, "prueba=prueba1;prueba2=prueba2");
		Mockito.when(arqueo.getArqueoHeaders(profile)).thenReturn(mapCabeceras);
		handler.execute(preContext);
		Mockito.verify(response, Mockito.times(1)).setHeader(Mockito.anyString(), Mockito.anyString());
	}

	/**
	 * @Historia (F-002)
	 * @Criterio (1)
	 * @Caso_de_prueba (Si el SN es arqueable y tiene varios datos de arqueo, se ejecuta el seteo de cabeceras)
	 * @Descripcion (Se verifica que si el SN es arqueable y tiene varios datos, el seteo de cabeceras se ejecuta.)
	 * @Estado (Ok)
	 */
	@Test
	public void si_existen_varias_cabeceras_arqueo_ejecuta_seteo_cabeceras() {
		Mockito.when(arqResolver.isSNArqueable(arqResolver.getSnName(FULL_SN_FROM_PROFILE),
				arqResolver.getSnMethod(FULL_SN_FROM_PROFILE))).thenReturn(true);
		Mockito.when(arqResolver.isCanalAllowed()).thenReturn(true);
		HashMap<String, String> mapCabeceras = new HashMap<String, String>();
		mapCabeceras.put("Arqueo-" + FULL_SN_FROM_PROFILE, "prueba=prueba1;prueba2=prueba2");
		mapCabeceras.put("Arqueo-" + FULL_SN_FROM_PROFILE + "2", "prueba=prueba1;prueba2=prueba2");
		Mockito.when(arqueo.getArqueoHeaders(profile)).thenReturn(mapCabeceras);
		handler.execute(preContext);
		Mockito.verify(response, Mockito.times(2)).setHeader(Mockito.anyString(), Mockito.anyString());
	}

}
